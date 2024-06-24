import sys
import os

print(f"Python версия: {sys.version}")
print(f"sys.prefix: {sys.prefix}")
print(f"sys.base_prefix: {sys.base_prefix}")

# Добавляем путь к папке src в sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.join(current_dir, 'src')
sys.path.append(src_dir)

print(f"Текущая директория: {current_dir}")
print(f"Директория src: {src_dir}")
print(f"sys.path: {sys.path}")

from src.data_processing import load_data, save_data
from src.distribution import distribute_to_buildings, distribute_to_assets, load_service_code_mapping
from src.forecasting import forecast_costs

print('Импорт модулей успешно выполнен')
print("Начало выполнения программы.")

try:
    # Загрузка данных
    print("Загрузка данных.")
    buildings_area_data, contracts_data, contract_building_relation_data, assets_data, bills_data, service_codes_data = load_data()

    # Создание маппинга для кодов услуг
    print("Создание маппинга для кодов услуг.")
    service_to_class = load_service_code_mapping(service_codes_data)

    # Цикл по всем загруженным счетам
    for file_key, bill_data in bills_data.items():
        print(f"Обработка файла: {file_key}")
        # Проверка наличия столбца 'Счет главной книги'
        if 'Счет главной книги' not in bill_data.columns:
            bill_data['Счет главной книги'] = None

        # Распределение по зданиям
        print("Распределение по зданиям.")
        distributed_to_buildings = distribute_to_buildings(bill_data, buildings_area_data, contract_building_relation_data, service_to_class)
        
        # Разнесение по основным средствам
        print("Распределение по основным средствам.")
        final_distributed_data = distribute_to_assets(distributed_to_buildings, assets_data)
        
        # Сохранение результата
        distributed_filename = f'Распределённые {file_key}.csv'
        print(f"Сохранение распределенных данных в файл: {distributed_filename}")
        save_data(final_distributed_data, distributed_filename)
        print(f"Данные успешно распределены и сохранены в {distributed_filename}.")
        
        # Выполнение прогнозирования затрат с использованием ML
        print("Прогнозирование затрат.")
        forecast_results = forecast_costs(final_distributed_data)
        
        # Сохранение результатов прогнозирования
        forecast_filename = f'Прогнозируемые {file_key}.csv'
        print(f"Сохранение прогнозируемых данных в файл: {forecast_filename}")
        save_data(forecast_results, forecast_filename)
        print(f"Прогнозируемые затраты успешно сохранены в {forecast_filename}.")

    print("Программа успешно завершена.")

except Exception as e:
    print(f"Произошла ошибка: {str(e)}")
    import traceback
    print(traceback.format_exc())