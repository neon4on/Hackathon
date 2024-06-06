import pandas as pd
import tensorflow as tf
import sys
import json
import os

def forecast_costs(model, future_dates):
    future_dates['date'] = pd.to_datetime(future_dates['date'])
    future_dates['month'] = future_dates['date'].dt.month
    future_dates['year'] = future_dates['date'].dt.year
    X_future = future_dates[['month', 'year']]

    predictions = model.predict(X_future)
    future_dates['predicted_amount'] = predictions

    return future_dates

if __name__ == "__main__":
    future_dates = json.loads(sys.stdin.read())
    future_dates = pd.DataFrame(future_dates)
    
    model_path = os.path.join(os.path.dirname(__file__), '../data/forecast_model.h5')
    model = tf.keras.models.load_model(model_path, custom_objects={'Adam': tf.keras.optimizers.Adam})
    forecast = forecast_costs(model, future_dates)
    forecast_json = forecast.to_json(orient='records', force_ascii=False)
    print(forecast_json.encode('utf-8').decode('utf-8'))
