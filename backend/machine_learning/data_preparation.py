import pandas as pd
from odf.opendocument import load
from odf.table import Table, TableRow, TableCell
from odf.text import P

def load_ods(file_path):
    doc = load(file_path)
    sheets = {}
    for sheet in doc.spreadsheet.getElementsByType(Table):
        rows = []
        for row in sheet.getElementsByType(TableRow):
            cells = []
            for cell in row.getElementsByType(TableCell):
                text = ''.join([node.nodeValue for node in cell.childNodes if node.nodeValue])
                cells.append(text)
            rows.append(cells)
        sheets[sheet.getAttribute("name")] = pd.DataFrame(rows[1:], columns=rows[0])
    return sheets

# Загрузка данных из ODS файлов
def load_data():
    distributed_bills_sheets = load_ods('/mnt/data/Распределенные счета на оплату 3800-2023.ods')
    service_codes_sheets = load_ods('/mnt/data/Коды услуг.ods')
    assets_sheets = load_ods('/mnt/data/Основные средства.ods')
    building_areas_sheets = load_ods('/mnt/data/Площади зданий.ods')
    contracts_sheets = load_ods('/mnt/data/Договоры.ods')
    bills_sheets = load_ods('/mnt/data/Счета на оплату 3800-2023.ods')
    contract_building_link_sheets = load_ods('/mnt/data/Связь договор - здания.ods')

    # Пример: Использование первого листа из каждого файла
    distributed_bills = distributed_bills_sheets[list(distributed_bills_sheets.keys())[0]]
    service_codes = service_codes_sheets[list(service_codes_sheets.keys())[0]]
    assets = assets_sheets[list(assets_sheets.keys())[0]]
    building_areas = building_areas_sheets[list(building_areas_sheets.keys())[0]]
    contracts = contracts_sheets[list(contracts_sheets.keys())[0]]
    bills = bills_sheets[list(bills_sheets.keys())[0]]
    contract_building_link = contract_building_link_sheets[list(contract_building_link_sheets.keys())[0]]

    return {
        'distributed_bills': distributed_bills,
        'service_codes': service_codes,
        'assets': assets,
        'building_areas': building_areas,
        'contracts': contracts,
        'bills': bills,
        'contract_building_link': contract_building_link
    }

if __name__ == "__main__":
    data = load_data()
    for key, df in data.items():
        print(f"{key}:\n", df.head())
