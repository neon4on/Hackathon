import React, { useState, useEffect } from 'react';
import Header from 'src/components/Header';
import styles from '../styles/pages/DistributedPaymentInvoices.module.scss';
import moment from 'moment';

const DistributedPaymentInvoices = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('Все');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distributionRunning, setDistributionRunning] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/files');
      if (!response.ok) {
        throw new Error('Не удалось загрузить список файлов');
      }
      const data = await response.json();
      setFiles(data);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке файлов:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const runDistribution = async () => {
    try {
      setDistributionRunning(true);
      const response = await fetch('/api/run-distribution', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Ошибка при запуске распределения');
      }
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error('Ошибка при запуске распределения:', err);
      alert(err.message);
    } finally {
      setDistributionRunning(false);
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSelectChange = (e) => {
    setSelect(e.target.value);
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
  };

  const searchFilter = (file) => {
    if (!search) return true;
    return file.name.toLowerCase().includes(search.toLowerCase());
  };

  const selectFilter = (file) => {
    if (select === 'Все') return true;
    return file.name.toLowerCase().includes(select.toLowerCase());
  };

  const dateFilter = (file) => {
    if (!year) return true;
    return file.name.includes(year);
  };

  const downloadFile = (filename) => {
    const link = document.createElement('a');
    link.href = `/api/files/${filename}`;
    link.download = filename;
    link.click();
  };

  const filteredFiles = files.filter(searchFilter).filter(selectFilter).filter(dateFilter);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <Header title="Распределенные счета на оплату" />
        <button
          className={styles.runDistributionButton}
          onClick={runDistribution}
          disabled={distributionRunning}>
          {distributionRunning ? 'Выполняется...' : 'Начать распределение'}
        </button>
        <label className={styles.dateInput}>
          <select value={year} onChange={onYearChange}>
            <option value="">Все годы</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </label>
        <select className={styles.select} onChange={onSelectChange}>
          <option value="Все">Все</option>
          <option value="Распределённые">Распределенные</option>
          <option value="Прогнозируемые">Прогнозируемые</option>
        </select>
        <label className={styles.search}>
          <input
            type="text"
            placeholder="Введите название"
            value={search}
            onChange={onSearchChange}
          />
        </label>
      </div>

      <div className={styles.exportSection}>
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <div
              key={index}
              className={styles.exportOptions}
              onClick={() => downloadFile(file.name)}>
              <img className={styles.downloadIcon} src="icons/download.svg" alt="Download Icon" />
              <span className={styles.date}>{moment(file.date).format('HH:mm DD.MM.YYYY')}</span>
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
