import pandas as pd
import tensorflow as tf
import sys
import json

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
    
    model = tf.keras.models.load_model('./forecast_model.h5')
    forecast = forecast_costs(model, future_dates)
    print(forecast.to_json(orient='records'))
