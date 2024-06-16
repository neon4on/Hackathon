// DistributedPaymentInvoices.jsx
import React, { useEffect, useState } from "react";
import Header from "src/components/Header";
import styles from "../styles/pages/DistributedPaymentInvoices.module.scss";

const DistributedPaymentInvoices = () => {
  const files = [
    "Прогнозируемые Счета на оплату 3800-2023_part1.csv",
    "Прогнозируемые Счета на оплату 4200-4000-3800-2024_part1.csv",
    "Прогнозируемые Счета на оплату 5400-2023_part1.csv",
    "Прогнозируемые Счета на оплату 5400-2024_part1.csv",
    "Прогнозируемые Счета на оплату 5500-2023_part1.csv",
    "Распределённые Счета на оплату 3800-2023_part1.csv",
    "Распределённые Счета на оплату 4200-4000-3800-2024_part1.csv",
    "Распределённые Счета на оплату 4200-4000-3800-2024_part2.csv",
    "Распределённые Счета на оплату 4200-4000-3800-2024_part3.csv",
    "Распределённые Счета на оплату 5400-2023_part1.csv",
    "Распределённые Счета на оплату 5400-2024_part1.csv",
    "Распределённые Счета на оплату 5500-2023_part1.csv",
  ];

  const downloadFile = (filename) => {
    window.location.href = `/files/${filename}`;
  };

  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterFunction = (file) => {
    if (search === "") return true;
    if (!file.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <Header title='Распределенные счета на оплату' />
        <label className={styles.search}>
          <input
            type='text'
            placeholder='Введите название'
            value={search}
            onChange={onSearchChange}
          />
        </label>
      </div>

      <div className={styles.exportSection}>
        {files.length > 0 ? (
          files.filter(filterFunction).map((file, index) => (
            <div key={index} className={styles.exportOptions} onClick={() => downloadFile(file)}>
              <img className={styles.downloadIcon} src='icons/download.svg' />
              <span className={styles.date}>01.01.2024 AM 04:00</span>
              <h3 className={styles.file}>{file}</h3>
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
