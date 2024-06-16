// DistributedPaymentInvoices.jsx
import React, { useEffect, useState } from "react";
import Header from "src/components/Header";
import styles from "../styles/pages/DistributedPaymentInvoices.module.scss";

import moment from "moment";

const DistributedPaymentInvoices = () => {
  const files = [
    { name: "Прогнозируемые Счета на оплату 3800-2023_part1.csv", date: new Date() },
    { name: "Прогнозируемые Счета на оплату 4200-4000-3800-2024_part1.csv", date: new Date() },
    { name: "Прогнозируемые Счета на оплату 5400-2023_part1.csv", date: new Date() },
    { name: "Прогнозируемые Счета на оплату 5400-2024_part1.csv", date: new Date() },
    { name: "Прогнозируемые Счета на оплату 5500-2023_part1.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 3800-2023_part1.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 4200-4000-3800-2024_part1.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 4200-4000-3800-2024_part2.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 4200-4000-3800-2024_part3.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 5400-2023_part1.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 5400-2024_part1.csv", date: new Date() },
    { name: "Распределённые Счета на оплату 5500-2023_part1.csv", date: new Date() },
  ];

  const downloadFile = (filename) => {
    window.location.href = `/files/${filename}`;
  };

  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("Все");
  const [year, setYear] = useState(2024);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSelectChange = (e) => {
    setSearch("");
    setSelect(e.target.value);
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
  };

  const searchFilter = (file) => {
    if (search === "") return true;
    if (!file.name.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  };

  const selectFilter = (file) => {
    if (select === "Все") return true;
    if (!file.name.toLowerCase().includes(select.toLowerCase())) return false;

    return true;
  };

  const dateFilter = (file) => {
    if (year === "") return true;

    return file.date.getFullYear() === Number(year);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <Header title='Распределенные счета на оплату' />
        <label className={styles.dateInput}>
          <input
            type='number'
            min='1900'
            max='2099'
            step='1'
            value={year}
            onChange={onYearChange}
          />
        </label>
        <select className={styles.select} onChange={onSelectChange}>
          <option value='Распределённые'>Распределенные</option>
          <option value='Прогнозируемые'>Прогнозируемые</option>
          <option value='Все'>Все</option>
        </select>
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
          files
            .filter(selectFilter)
            .filter(searchFilter)
            .filter(dateFilter)
            .map((file, index) => (
              <div key={index} className={styles.exportOptions} onClick={() => downloadFile(file)}>
                <img className={styles.downloadIcon} src='icons/download.svg' />
                <span className={styles.date}>{moment(file.date).format("hh:mm DD.MM.YYYY")}</span>
                <h3 className={styles.file}>{file.name}</h3>
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
