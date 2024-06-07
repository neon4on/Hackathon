def distribute_by_buildings(df):
    buildings_distribution = []
    for _, row in df.iterrows():
        buildings_distribution.append({
            "Здание": row['Здание'],
            "Дата отражения в учетной системе": row['Дата отражения в учетной системе'],
            "Распределенная сумма": row['Сумма распределения']
        })
    return buildings_distribution

import pandas as pd

def distribute_by_assets(df, buildings_df):
    """
    Function to distribute costs by assets.
    Args:
        df (pd.DataFrame): DataFrame containing the bills.
        buildings_df (pd.DataFrame): DataFrame containing the buildings information.
    Returns:
        pd.DataFrame: DataFrame with distributed costs.
    """
    # Пример распределения затрат по площади здания
    df['Площадь здания'] = df['Здание'].map(buildings_df.set_index('Здание')['Площадь'])
    
    # Проверим, какие данные у нас есть
    print("Columns in bills DataFrame:", df.columns)
    print("Columns in buildings DataFrame:", buildings_df.columns)
    
    # Предположим, что сумма распределения пропорциональна площади здания
    df['Распределенная сумма'] = df['Стоимость без НДС'] * (df['Площадь здания'] / df['Площадь здания'].sum())
    
    # Уберем промежуточные столбцы
    df = df.drop(columns=['Площадь здания'])
    
    return df


