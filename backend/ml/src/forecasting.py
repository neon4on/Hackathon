import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

def prepare_data(data):
    print("Подготовка данных для модели.")
    X = data[['Год счета', 'Площадь']]
    y = data['Сумма распределения']
    return train_test_split(X, y, test_size=0.2, random_state=42)

def train_model(X_train, y_train):
    print("Обучение модели.")
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    print("Оценка модели.")
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Средняя абсолютная ошибка: {mae}")
    return mae, y_pred

def forecast(model, new_data):
    print("Прогнозирование затрат.")
    return model.predict(new_data)

def forecast_costs(data):
    print("Начало процесса прогнозирования затрат.")
    X_train, X_test, y_train, y_test = prepare_data(data)
    model = train_model(X_train, y_train)
    mae, y_pred = evaluate_model(model, X_test, y_test)
    print(f"Средняя абсолютная ошибка модели: {mae}")
    future_data = data[['Год счета', 'Площадь', 'Счет главной книги', 'Здание']].drop_duplicates().reset_index(drop=True)
    future_data['Год счета'] += 1
    future_data['Прогнозируемая сумма'] = forecast(model, future_data[['Год счета', 'Площадь']])
    print("Прогнозирование завершено.")
    return future_data
