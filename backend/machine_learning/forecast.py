import tensorflow as tf
import pandas as pd
import numpy as np
import sys
import json
from sklearn.model_selection import train_test_split

def train_model(data):
    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    X = df[['month', 'year']]
    y = df['amount']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=[2]),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse', metrics=['mae'])

    model.fit(X_train, y_train, epochs=10, validation_split=0.2)

    return model

def forecast_costs(model, future_dates):
    future_dates['date'] = pd.to_datetime(future_dates['date'])
    future_dates['month'] = future_dates['date'].dt.month
    future_dates['year'] = future_dates['date'].dt.year
    X_future = future_dates[['month', 'year']]

    predictions = model.predict(X_future)
    future_dates['predicted_amount'] = predictions

    return future_dates

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())

    model = train_model(input_data)

    future_dates = pd.DataFrame({
        'date': ['2023-01-01', '2023-02-01', '2023-03-01']
    })

    forecast = forecast_costs(model, future_dates)
    print(forecast.to_json(orient='records'))
