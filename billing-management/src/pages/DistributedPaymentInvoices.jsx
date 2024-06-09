import React from 'react';
import styles from '../styles/pages/DistributedPaymentInvoices.module.scss';

const DistributedPaymentInvoices = () => {
  const data = [
    {
      company: 'Компания "A"',
      accountNo: '25036',
      position: '052',
      year: '2006',
      positionNo: '4',
      date: '15.02.2006',
      contractId: 'ID 2006',
      serviceId: 'ID 98-A',
      serviceClass: 'A',
      building: 'Здание X',
      area: '350 кв.м',
      assetId: '5820-6',
      assetClass: 'A',
      usageSign: 'См.файл',
      usageMethod: 'См.файл',
      allocatedAmount: '5 000 000',
      ledgerAccount: 'См.файл',
    },
    {
      company: 'Компания "B"',
      accountNo: '24800',
      position: '053',
      year: '2009',
      positionNo: '69',
      date: '16.05.2009',
      contractId: 'ID 2009',
      serviceId: 'ID 98-65',
      serviceClass: 'A',
      building: 'Здание Y',
      area: '3550 кв.м',
      assetId: '54-6302',
      assetClass: 'S',
      usageSign: 'См.файл',
      usageMethod: 'См.файл',
      allocatedAmount: '3 000 586',
      ledgerAccount: 'См.файл',
    },
  ];

  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <select>
          <option>Дата</option>
          <option>06.06.2024</option>
          <option>05.06.2024</option>
          <option>04.06.2024</option>
          <option>03.06.2024</option>
          <option>02.06.2024</option>
        </select>
        <select>
          <option>Компания</option>
          <option>Компания 1</option>
          <option>Компания 205</option>
          <option>Компания 3520</option>
          <option>Компания 29</option>
          <option>Компания 2005</option>
        </select>
        <select>
          <option>Задания</option>
          <option>Задание 1</option>
          <option>Задание 105</option>
          <option>Задание 1026</option>
          <option>Задание 1035</option>
          <option>Задание 154</option>
        </select>
      </div>
      <div className={styles.dataTable}>
        <table>
          <thead>
            <tr>
              <th>Компания</th>
              <th>Счет, No.</th>
              <th>Позиция счета</th>
              <th>Год счета</th>
              <th>Позиция распределения, No.</th>
              <th>Дата отражения счета в учетной системе</th>
              <th>ID договора</th>
              <th>ID услуги</th>
              <th>Класс услуги</th>
              <th>Здание</th>
              <th>Площадь</th>
              <th>ID основного средства</th>
              <th>Класс основного средства</th>
              <th>Признак "Использования в основной деятельности"</th>
              <th>Признак "Способ использования"</th>
              <th>Распределенная сумма на основное средство</th>
              <th>Счёт главной книги</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.company}</td>
                <td>{row.accountNo}</td>
                <td>{row.position}</td>
                <td>{row.year}</td>
                <td>{row.positionNo}</td>
                <td>{row.date}</td>
                <td>{row.contractId}</td>
                <td>{row.serviceId}</td>
                <td>{row.serviceClass}</td>
                <td>{row.building}</td>
                <td>{row.area}</td>
                <td>{row.assetId}</td>
                <td>{row.assetClass}</td>
                <td>{row.usageSign}</td>
                <td>{row.usageMethod}</td>
                <td>{row.allocatedAmount}</td>
                <td>{row.ledgerAccount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.exportSection}>
        <button>Экспортировать в XLS/XLSX</button>
        <div className={styles.exportOptions}>
          <input type="radio" id="xls" name="format" value="xls" />
          <label htmlFor="xls">XLS</label>
          <input type="radio" id="xlsx" name="format" value="xlsx" />
          <label htmlFor="xlsx">XLSX</label>
          <input type="text" placeholder="сведите No. строки" />
          <input type="text" placeholder="поведите No. строки" />
          <button>Экспортировать</button>
        </div>
      </div>
    </div>
  );
};

export default DistributedPaymentInvoices;
