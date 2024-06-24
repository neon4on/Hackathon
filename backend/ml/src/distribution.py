import pandas as pd
import numpy as np
from collections import Counter
from fuzzywuzzy import fuzz
from tqdm import tqdm

def load_service_code_mapping(service_codes):
    service_to_class = dict(zip(service_codes['ID услуги'], service_codes['Класс услуги']))
    return service_to_class

def determine_general_ledger_account(row):
    unique_identifier = (
        row['Номер счета'],
        row['Позиция счета'],
        row['Номер позиции распределения'],
        row['Дата отражения в учетной системе'],
        row['ID договора'],
        row['Услуга'],
        row['Класс услуги'],
        row['Здание'],
        row['Класс ОС'],
        row['ID основного средства'],
        row['Признак "Использование в основной деятельности"'],
        row['Признак "Способ использования"'],
        row['Площадь']
    )
    return abs(hash(unique_identifier)) % (10**10)

def convert_date(date):
    if pd.isna(date) or date == '':
        return None
    if isinstance(date, (int, float)) and len(str(int(date))) == 5:
        return (pd.to_datetime('1899-12-30') + pd.to_timedelta(int(date), unit='D')).date()
    if isinstance(date, str):
        return pd.to_datetime(date).date()
    if isinstance(date, pd.Timestamp):
        return date.date()
    return date


def distribute_to_buildings(bills, buildings, contract_building_relation, service_to_class):
    buildings['Площадь'] = buildings['Площадь'].astype(str).str.replace(',', '.').astype(float)
    bills['Стоимость без НДС'] = pd.to_numeric(bills['Стоимость без НДС'].astype(str).str.replace(',', '.'), errors='coerce')
    
    distributed_data = []

    for index, bill in tqdm(bills.iterrows(), total=len(bills), desc="Распределение по зданиям"):
        total_amount = bill['Стоимость без НДС']
        if pd.isna(total_amount) or total_amount == 0:
            
            continue

        relevant_buildings = buildings[buildings['Здание'].isin(contract_building_relation[contract_building_relation['ID договора'] == bill['ID договора']]['ID здания'])]
        total_area = relevant_buildings['Площадь'].sum()
        
        if relevant_buildings.empty:
            
            relevant_buildings = pd.DataFrame([{'Здание': 'Неизвестно', 'Площадь': 1}])

        if total_area == 0 or pd.isna(total_area):
            
            total_area = 1

        position_counter = 1
        service_class = service_to_class.get(bill['ID услуги'], 'Не указан')

        for _, building in relevant_buildings.iterrows():
            allocation = total_amount * (building['Площадь'] / total_area)
            distributed_data.append({
                'Компания': bill['Компания'],
                'Год счета': bill['Год'],
                'Номер счета': bill['Номер счета'],
                'Позиция счета': bill['Позиция счета'],
                'Номер позиции распределения': position_counter,
                'Дата отражения в учетной системе': convert_date(bill['Дата отражения счета в учетной системе']),
                'ID договора': bill['ID договора'],
                'Услуга': bill['ID услуги'],
                'Класс услуги': service_class,
                'Здание': building['Здание'],
                'Класс ОС': None,
                'ID основного средства': None,
                'Признак "Использование в основной деятельности"': None,
                'Признак "Способ использования"': None,
                'Площадь': building['Площадь'],
                'Сумма распределения': allocation,
                'Счет главной книги': None
            })
            position_counter += 1
    
    result = pd.DataFrame(distributed_data)
    print(f"Распределено {len(result)} строк. Сумма распределения: {result['Сумма распределения'].sum():.2f}")
    return result

def find_matching_assets(row, assets, threshold=80):
    exact_match = assets[assets['ID здания'] == row['Здание']]
    if not exact_match.empty:
        return exact_match

    building_name = str(row['Здание'])
    potential_matches = assets[assets['ID здания'].astype(str).apply(lambda x: fuzz.ratio(x, building_name) > threshold)]
    
    if not potential_matches.empty:
        return potential_matches

    return pd.DataFrame([{
        'ID основного средства': "Неизвестно", 
        'Площадь': 1, 
        'Класс основного средства': 'Неизвестно', 
        'Признак "Используется в основной деятельности"': 'Неизвестно', 
        'Признак "Способ использования"': 'Неизвестно'
    }])

def distribute_to_assets(distributed_data, assets):
    final_data = []
    building_asset_counts = Counter()

    for index, row in tqdm(distributed_data.iterrows(), total=len(distributed_data), desc="Распределение по основным средствам"):
        relevant_assets = find_matching_assets(row, assets)
        building_asset_counts[row['Здание']] += len(relevant_assets)

        total_asset_area = relevant_assets['Площадь'].sum()
        if total_asset_area == 0 or pd.isna(total_asset_area):
            total_asset_area = 1

        for _, asset in relevant_assets.iterrows():
            allocation = row['Сумма распределения'] * (asset['Площадь'] / total_asset_area)
            new_row = row.to_dict()
            new_row.update({
                'Класс ОС': asset['Класс основного средства'],
                'ID основного средства': asset['ID основного средства'],
                'Признак "Использование в основной деятельности"': asset['Признак "Используется в основной деятельности"'],
                'Признак "Способ использования"': asset['Признак "Способ использования"'],
                'Счет главной книги': None,
                'Сумма распределения': allocation
            })
            final_data.append(new_row)

    final_df = pd.DataFrame(final_data)
    final_df['Счет главной книги'] = final_df.apply(determine_general_ledger_account, axis=1)
    
    return final_df