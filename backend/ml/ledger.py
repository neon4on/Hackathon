def determine_ledger_account(row):
    """
    Determine the ledger account based on the provided row data.
    """
    service_class = row['Класс услуги']
    asset_class = row['Класс ОС']
    primary_use = row['Признак "Использование в основной деятельности"']
    use_method = row['Признак "Способ использования"']

    # Example logic based on provided fields
    if service_class == 'S004' and primary_use == 'X':
        return '7048209010'
    elif service_class == 'S036':
        return '7048209020'
    elif asset_class in [60401018, 61908996]:
        return '7048209030'
    elif use_method == 'X':
        return '7048209040'
    else:
        return 'UNKNOWN'

def process_final_data(df):
    final_data = []
    for _, row in df.iterrows():
        final_data.append({
            "Компания": row['Компания'],
            "Год счета": row['Год счета'],
            "Номер счета": row['Номер счета'],
            "Позиция счета": row['Позиция счета'],
            "Номер позиции распределения": row['Номер позиции распределения'],
            "Дата отражения в учетной системе": row['Дата отражения в учетной системе'],
            "ID договора": row['ID договора'],
            "Услуга": row['Услуга'],
            "Класс услуги": row['Класс услуги'],
            "Здание": row['Здание'],
            "Класс ОС": row['Класс ОС'],
            "ID основного средства": row['ID основного средства'],
            "Признак \"Использование в основной деятельности\"": row['Признак "Использование в основной деятельности"'],
            "Признак \"Способ использования\"": row['Признак "Способ использования"'],
            "Площадь": row['Площадь'],
            "Сумма распределения": row['Сумма распределения'],
            "Счет главной книги": determine_ledger_account(row)  # Используем функцию здесь
        })
    return final_data
