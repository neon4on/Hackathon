// DistributedPaymentInvoices.jsx
import React from 'react';
import Header from 'src/components/Header';
import styles from '../styles/pages/DistributedPaymentInvoices.module.scss';

const DistributedPaymentInvoices = () => {
  const files = [
    'Прогнозируемые Счета на оплату 3800-2023_part1.csv',
    'Прогнозируемые Счета на оплату 4200-4000-3800-2024_part1.csv',
    'Прогнозируемые Счета на оплату 5400-2023_part1.csv',
    'Прогнозируемые Счета на оплату 5400-2024_part1.csv',
    'Прогнозируемые Счета на оплату 5500-2023_part1.csv',
    'Распределённые Счета на оплату 3800-2023_part1.csv',
    'Распределённые Счета на оплату 4200-4000-3800-2024_part1.csv',
    'Распределённые Счета на оплату 4200-4000-3800-2024_part2.csv',
    'Распределённые Счета на оплату 4200-4000-3800-2024_part3.csv',
    'Распределённые Счета на оплату 5400-2023_part1.csv',
    'Распределённые Счета на оплату 5400-2024_part1.csv',
    'Распределённые Счета на оплату 5500-2023_part1.csv',
  ];

  const downloadFile = (filename) => {
    window.location.href = `/files/${filename}`;
  };

  return (
    <div className={styles.mainContent}>
      <Header title="Распределенные счета на оплату" />
      <div className={styles.exportSection}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className={styles.exportOptions}>
              <h3>{file}</h3>
              <button onClick={() => downloadFile(file)}>Скачать</button>
            </div>
          ))
        ) : (
          <p>Файлы не найдены</p>
        )}
      </div>
    </div>
  );
};

export default DistributedPaymentInvoices;
