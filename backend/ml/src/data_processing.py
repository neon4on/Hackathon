import pandas as pd
import os

def load_data():
    print("Загрузка данных началась.")
    files = ['Счета на оплату 3800-2023.xlsx', 'Счета на оплату 4200-4000-3800-2024.xlsx', 
             'Счета на оплату 5400-2023.xlsx', 'Счета на оплату 5400-2024.xlsx', 
             'Счета на оплату 5500-2023.xlsx', 'Счета на оплату 5500-2024.xlsx', ]
    
    print("Загрузка данных о площадях зданий.")
    buildings_area_data = pd.read_excel('data/Площади зданий.xlsx')
    print("Загрузка данных о договорах.")
    contracts_data = pd.read_excel('data/Договоры.xlsx')
    print("Загрузка данных о связи договоров и зданий.")
    contract_building_relation_data = pd.read_excel('data/Связь договор - здания.xlsx')
    print("Загрузка данных об основных средствах.")
    assets_data = pd.read_excel('data/Основные средства.xlsx')
    print("Загрузка данных о кодах услуг.")
    service_codes_data = pd.read_excel('data/Коды услуг.xlsx')
    
    bills_data = {}
    for file in files:
        file_key = os.path.splitext(file)[0]
        print(f"Загрузка данных из файла: {file}")
        bills_data[file_key] = pd.read_excel(f'data/{file}')
    
    print("Все данные успешно загружены.")
    return buildings_area_data, contracts_data, contract_building_relation_data, assets_data, bills_data, service_codes_data

def save_data(data, filename):
    print(f"Сохранение данных в файл: {filename}")
    max_rows = 400000
    for i in range(0, len(data), max_rows):
        part = data.iloc[i:i+max_rows]
        part_filename = f"{os.path.splitext(filename)[0]}_part{i//max_rows + 1}.csv"
        print(f"Сохранение части данных в файл: {part_filename}")
        part.to_csv(part_filename, index=False, sep=';', decimal='.', encoding='utf-8')
    print("Данные успешно сохранены.")
