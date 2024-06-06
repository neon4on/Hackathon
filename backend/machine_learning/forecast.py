import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from data_preparation import load_data, prepare_data
import os

def train_model(data):
    df = prepare_data(data)
    X = df[['month', 'year']]
    y = df['Стоимость без НДС']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=[2]),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer=tf.keras.optimizers.Adam(), loss='mean_squared_error', metrics=['mae'])

    model.fit(X_train, y_train, epochs=10, validation_split=0.2)

    return model

if __name__ == "__main__":
    data = load_data()
    model = train_model(data)
    model_save_path = os.path.join(os.path.dirname(__file__), '../data/forecast_model.h5')
    model.save(model_save_path)
    print(f"Model saved at {model_save_path}")
