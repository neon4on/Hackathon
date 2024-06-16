import pandas as pd
import os

def load_data():
    files = ['Счета на оплату 3800-2023.xlsx', 'Счета на оплату 4200-4000-3800-2024.xlsx', 
             'Счета на оплату 5400-2023.xlsx', 'Счета на оплату 5400-2024.xlsx', 
             'Счета на оплату 5500-2023.xlsx']
    buildings_area_data = pd.read_excel('data/Площади зданий.xlsx')
    contracts_data = pd.read_excel('data/Договоры.xlsx')
    contract_building_relation_data = pd.read_excel('data/Связь договор - здания.xlsx')
    assets_data = pd.read_excel('data/Основные средства.xlsx')
    service_codes_data = pd.read_excel('data/Коды услуг.xlsx')
    
    bills_data = {}
    for file in files:
        file_key = os.path.splitext(file)[0]
        bills_data[file_key] = pd.read_excel(f'data/{file}')
    
    return buildings_area_data, contracts_data, contract_building_relation_data, assets_data, bills_data, service_codes_data

def save_data(data, filename):
    max_rows = 400000
    for i in range(0, len(data), max_rows):
        part = data.iloc[i:i+max_rows]
        part_filename = f"{os.path.splitext(filename)[0]}_part{i//max_rows + 1}.csv"
        part.to_csv(part_filename, index=False, sep=';', decimal='.', encoding='utf-8')
