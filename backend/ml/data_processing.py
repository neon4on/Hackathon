import pandas as pd
import os

def load_data(file_paths):
    data = {}
    for name, path in file_paths.items():
        full_path = os.path.join(os.path.dirname(__file__), '..', 'data', path)
        try:
            if path.lower().endswith('.xlsx'):
                data[name] = pd.read_excel(full_path, engine='openpyxl')
            elif path.lower().endswith('.csv'):
                data[name] = pd.read_csv(full_path, encoding='utf-8')
            else:
                raise ValueError(f"Unsupported file format for file: {path}")
        except Exception as e:
            raise ValueError(f"Error loading {full_path}: {e}")
    return data
