import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
import os

def train_model(data):
    df = pd.DataFrame(data)
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    X = df[['month', 'year']]
    y = df['amount']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=[2]),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse', metrics=['mae'])

    model.fit(X_train, y_train, epochs=10, validation_split=0.2)

    return model

if __name__ == "__main__":
    # Пример использования
    data = {
        'date': ['2022-01-01', '2022-02-01', '2022-03-01'],
        'amount': [1000, 1500, 1200]
    }

    model = train_model(data)
    model_save_path = './forecast_model.h5'
    model.save(model_save_path)
    print(f"Model saved at {model_save_path}")
