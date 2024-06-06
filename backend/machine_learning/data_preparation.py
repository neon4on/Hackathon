import pandas as pd
import os

# Определение пути до директории с данными
data_dir = os.path.join(os.path.dirname(__file__), '../data')

# Загрузка данных из XLSX файлов
def load_data():
    distributed_bills = pd.read_excel(os.path.join(data_dir, 'Распределенные_счета_на_оплату_3800_2023.xlsx'))
    contracts = pd.read_excel(os.path.join(data_dir, 'Договоры.xlsx'))
    service_codes = pd.read_excel(os.path.join(data_dir, 'Коды услуг.xlsx'))
    assets = pd.read_excel(os.path.join(data_dir, 'Основные средства.xlsx'))
    building_areas = pd.read_excel(os.path.join(data_dir, 'Площади зданий.xlsx'))
    bills = pd.read_excel(os.path.join(data_dir, 'Счета на оплату 3800-2023.xlsx'))
    contract_building_link = pd.read_excel(os.path.join(data_dir, 'Связь договор - здания.xlsx'))

    return {
        'distributed_bills': distributed_bills,
        'contracts': contracts,
        'service_codes': service_codes,
        'assets': assets,
        'building_areas': building_areas,
        'bills': bills,
        'contract_building_link': contract_building_link
    }

def prepare_data(data):
    # Пример: объединение данных для дальнейшего использования
    bills = data['bills']
    service_codes = data['service_codes']
    
    # Проверка наличия столбцов
    print("Bills columns:", bills.columns)
    print("Service codes columns:", service_codes.columns)
    
    # Объединение счетов и кодов услуг по ID услуги
    merged_data = pd.merge(bills, service_codes, how='left', left_on='ID услуги', right_on='ID услуги')
    
    # Проверка наличия столбцов после слияния
    print("Merged data columns:", merged_data.columns)
    
    # Пример: преобразование даты в год и месяц
    date_column = 'Дата отражения счета в учетной системе'  # Убедитесь, что это правильное имя столбца
    merged_data[date_column] = pd.to_datetime(merged_data[date_column])
    merged_data['year'] = merged_data[date_column].dt.year
    merged_data['month'] = merged_data[date_column].dt.month

    return merged_data

if __name__ == "__main__":
    data = load_data()
    prepared_data = prepare_data(data)
    print(prepared_data.head())
