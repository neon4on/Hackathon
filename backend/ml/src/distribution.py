import pandas as pd

def load_service_code_mapping(service_codes):
    # Создание маппинга "ID услуги" -> "Класс услуги"
    print("Создание маппинга кодов услуг.")
    service_to_class = dict(zip(service_codes['ID услуги'], service_codes['Класс услуги']))
    print("Маппинг кодов услуг успешно создан.")
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
    print("Начало распределения по зданиям.")
    buildings['Площадь'] = buildings['Площадь'].astype(str).str.replace(',', '.').astype(float)
    
    # Преобразование 'Стоимость без НДС' в числовой тип
    bills['Стоимость без НДС'] = pd.to_numeric(bills['Стоимость без НДС'], errors='coerce')
    
    distributed_data = []

    for index, bill in bills.iterrows():
        total_amount = bill['Стоимость без НДС']
        relevant_buildings = buildings[buildings['Здание'].isin(contract_building_relation[contract_building_relation['ID договора'] == bill['ID договора']]['ID здания'])]
        total_area = relevant_buildings['Площадь'].sum()
        
        if relevant_buildings.empty:
            relevant_buildings = pd.DataFrame([{'Здание': 'Неизвестно', 'Площадь': 1}])

        if total_area == 0 or pd.isna(total_area):
            total_area = 1

        position_counter = 1
        service_class = service_to_class.get(bill['ID услуги'], 'Не указан')

        date_reflected = convert_date(bill['Дата отражения счета в учетной системе'])

        for _, building in relevant_buildings.iterrows():
            allocation = total_amount * (building['Площадь'] / total_area)
            distributed_data.append({
                'Компания': bill['Компания'],
                'Год счета': bill['Год'],
                'Номер счета': bill['Номер счета'],
                'Позиция счета': bill['Позиция счета'],
                'Номер позиции распределения': position_counter,
                'Дата отражения в учетной системе': date_reflected,
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
    
    distributed_df = pd.DataFrame(distributed_data)
    print(f"Распределённые данные: {distributed_df[['Номер счета', 'Сумма распределения']].head()}")
    
    print("Распределение по зданиям завершено.")
    return distributed_df
    print("Распределение по зданиям завершено.")
    return pd.DataFrame(distributed_data)

def distribute_to_assets(distributed_data, assets):
    print("Начало распределения по основным средствам.")
    final_data = []

    for _, row in distributed_data.iterrows():
        relevant_assets = assets[assets['ID здания'] == row['Здание']]
        total_asset_area = relevant_assets['Площадь'].sum()
        
        if relevant_assets.empty:
            relevant_assets = pd.DataFrame([{
                'ID основного средства': 'Неизвестно', 
                'Площадь': 1, 
                'Класс основного средства': 'Неизвестно', 
                'Признак "Используется в основной деятельности"': 'Неизвестно', 
                'Признак "Способ использования"': 'Неизвестно'
            }])

        if total_asset_area == 0 or pd.isna(total_asset_area):
            total_asset_area = 1

        for _, asset in relevant_assets.iterrows():
            allocation = row['Сумма распределения'] * (asset['Площадь'] / total_asset_area)
            new_row = row.to_dict()
            new_row.update({
                'Класс ОС': asset['Класс основного средства'],
                'ID основного средства': str(asset['ID основного средства']),
                'Признак "Использование в основной деятельности"': asset['Признак "Используется в основной деятельности"'],
                'Признак "Способ использования"': asset['Признак "Способ использования"'],
                'Счет главной книги': None
            })
            final_data.append(new_row)
    
    final_df = pd.DataFrame(final_data)
    final_df['Счет главной книги'] = final_df.apply(determine_general_ledger_account, axis=1)
    
    print("Распределение по основным средствам завершено.")
    return final_df
