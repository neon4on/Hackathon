import pandas as pd
import os
import numpy as np
import re

def load_data():
    print("Загрузка данных началась.")
    current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(current_dir, 'data')
    
    print(f"Текущая директория: {current_dir}")
    print(f"Директория с данными: {data_dir}")
    print(f"Содержимое директории с данными:")
    for file in os.listdir(data_dir):
        print(f"- {file}")

    files = ['Счета на оплату 5500-2024.xlsx']
    
    def load_excel(filename):
        file_path = os.path.join(data_dir, filename)
        print(f"Загрузка файла: {file_path}")
        if not os.path.exists(file_path):
            print(f"ОШИБКА: Файл не найден: {file_path}")
            return None
        return pd.read_excel(file_path)

    print("Загрузка данных о площадях зданий.")
    buildings_area_data = load_excel('Площади зданий.xlsx')
    print("Загрузка данных о договорах.")
    contracts_data = load_excel('Договоры.xlsx')
    print("Загрузка данных о связи договоров и зданий.")
    contract_building_relation_data = load_excel('Связь договор - здания.xlsx')
    print("Загрузка данных об основных средствах.")
    assets_data = load_excel('Основные средства.xlsx')
    if assets_data is not None:
        assets_data['ID основного средства'] = assets_data['ID основного средства'].astype(str)
    print("Загрузка данных о кодах услуг.")
    service_codes_data = load_excel('Коды услуг.xlsx')
    
    if assets_data is not None:
        assets_data['ID основного средства'] = assets_data['ID основного средства'].apply(process_asset_id)
    
    bills_data = {}
    for file in files:
        file_key = os.path.splitext(file)[0]
        print(f"Загрузка данных из файла: {file}")
        bills_data[file_key] = load_excel(file)
    
    print("Все данные успешно загружены.")
    return buildings_area_data, contracts_data, contract_building_relation_data, assets_data, bills_data, service_codes_data

def process_asset_id(value):
    if pd.isna(value):
        return "Неизвестно"
    
    if isinstance(value, str) and 'e' not in value.lower():
        return value
    
    try:
        number = float(str(value).replace(',', '.'))
        return str(int(number))
    except ValueError:
        return str(value)
    
def save_data(data, filename):
    print(f"Сохранение данных в файл: {filename}")
    max_rows = 400000
    for i in range(0, len(data), max_rows):
        part = data.iloc[i:i+max_rows]
        part_filename = f"{os.path.splitext(filename)[0]}_part{i//max_rows + 1}.csv"
        print(f"Сохранение части данных в файл: {part_filename}")
        part.to_csv(part_filename, index=False, sep=',', decimal='.', encoding='utf-8-sig')
    print("Данные успешно сохранены.")