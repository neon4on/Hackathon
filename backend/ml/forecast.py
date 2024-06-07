import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

def forecast_costs(df):
    """
    Forecast future costs based on historical data in the provided DataFrame.
    """
    # Example columns: 'Дата отражения в учетной системе', 'Сумма распределения'
    df['Дата отражения в учетной системе'] = pd.to_datetime(df['Дата отражения в учетной системе'])
    df['year'] = df['Дата отражения в учетной системе'].dt.year
    df['month'] = df['Дата отражения в учетной системе'].dt.month

    # Create features and target variable
    X = df[['year', 'month']]
    y = df['Сумма распределения']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train a linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Predict future costs (for example, the next 12 months)
    future_dates = pd.date_range(start=df['Дата отражения в учетной системе'].max(), periods=12, freq='M')
    future_data = pd.DataFrame({'year': future_dates.year, 'month': future_dates.month})

    future_costs = model.predict(future_data)

    forecast = pd.DataFrame({'Дата': future_dates, 'Прогнозируемая сумма': future_costs})
    return forecast
