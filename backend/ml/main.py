import sys 
print(sys.prefix, sys.base_prefix)
from src.data_processing import load_data, save_data
from src.distribution import distribute_to_buildings, distribute_to_assets, load_service_code_mapping
from src.forecasting import forecast_costs
import os

print('HI')
# Загрузка данных
buildings_area_data, contracts_data, contract_building_relation_data, assets_data, bills_data, service_codes_data = load_data()

# Создание маппинга для кодов услуг
service_to_class = load_service_code_mapping(service_codes_data)

# Цикл по всем загруженным счетам
for file_key, bill_data in bills_data.items():
    # Проверка наличия столбца 'Счет главной книги'
    if 'Счет главной книги' not in bill_data.columns:
        bill_data['Счет главной книги'] = None

    # Распределение по зданиям
    distributed_to_buildings = distribute_to_buildings(bill_data, buildings_area_data, contract_building_relation_data, service_to_class)
    
    # Разнесение по основным средствам
    final_distributed_data = distribute_to_assets(distributed_to_buildings, assets_data)
    
    # Сохранение результата
    distributed_filename = f'Распределённые {file_key}.csv'
    save_data(final_distributed_data, distributed_filename)
    print(f"Данные успешно распределены и сохранены в {distributed_filename}.")
    
    # Выполнение прогнозирования затрат с использованием ML
    forecast_results = forecast_costs(final_distributed_data)
    
    # Сохранение результатов прогнозирования
    forecast_filename = f'Прогнозируемые {file_key}.csv'
    save_data(forecast_results, forecast_filename)
    print(f"Прогнозируемые затраты успешно сохранены в {forecast_filename}.")
