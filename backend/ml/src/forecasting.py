import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

def prepare_data(data):
    # Предполагаем, что 'Сумма распределения' - целевая переменная, а остальные столбцы - признаки
    X = data[['Год счета', 'Площадь']]
    y = data['Сумма распределения']
    return train_test_split(X, y, test_size=0.2, random_state=42)

def train_model(X_train, y_train):
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    return mae, y_pred

def forecast(model, new_data):
    return model.predict(new_data)

def forecast_costs(data):
    # Подготовка данных
    X_train, X_test, y_train, y_test = prepare_data(data)
    
    # Обучение модели
    model = train_model(X_train, y_train)
    
    # Оценка модели
    mae, y_pred = evaluate_model(model, X_test, y_test)
    print(f'Mean Absolute Error: {mae}')
    
    # Прогнозирование затрат на новых данных
    future_data = data[['Год счета', 'Площадь', 'Счет главной книги', 'Здание']].drop_duplicates().reset_index(drop=True)
    future_data['Год счета'] += 1  # Пример: прогнозирование на следующий год
    future_data['Прогнозируемая сумма'] = forecast(model, future_data[['Год счета', 'Площадь']])
    
    return future_data

