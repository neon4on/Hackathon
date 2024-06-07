import os
import pandas as pd
from data_processing import load_data
from distribution import distribute_by_assets
from ledger import determine_ledger_account
from forecast import forecast_costs

def main():
    # Путь к папке data
    data_folder = os.path.join(os.path.dirname(__file__), '..', 'data')
    
    # Путь к файлам данных
    file_paths = {
        "Распределенные_счета_на_оплату": os.path.join(data_folder, "Распределенные_счета_на_оплату.xlsx"),
        "Договоры": os.path.join(data_folder, "Договоры.xlsx"),
        "Коды услуг": os.path.join(data_folder, "Коды услуг.xlsx"),
        "Основные средства": os.path.join(data_folder, "Основные средства.xlsx"),
        "Площади зданий": os.path.join(data_folder, "Площади зданий.xlsx"),
        "Счета на оплату": os.path.join(data_folder, "Счета на оплату.xlsx"),
        "Связь договор - здания": os.path.join(data_folder, "Связь договор - здания.xlsx"),
        "Шаблон ответа": os.path.join(data_folder, "Шаблон ответа.csv")
    }
    
    data = load_data(file_paths)
    
    # Пример использования функции distribute_by_assets
    distribution = distribute_by_assets(data['Счета на оплату'], data['Площади зданий'])
    
    # Пример использования функции determine_ledger_account
    data['Распределенные_счета_на_оплату']['Счет главной книги'] = data['Распределенные_счета_на_оплату'].apply(determine_ledger_account, axis=1)
    
    # Пример использования функции forecast_costs
    forecast = forecast_costs(data['Распределенные_счета_на_оплату'])
    
    print(forecast)

if __name__ == "__main__":
    main()
