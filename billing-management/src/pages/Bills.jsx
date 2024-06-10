import React, { useState } from 'react';
import styles from "../styles/pages/Bills.module.scss"
import Header from '../components/Header';
import NavTabs from '../components/NavTabs';
import MainHeading from '../components/MainHeading';
import DataTable from '../components/DataTable';
import AddButton from '../components/AddButton';

function App() {
  const [activeTab, setActiveTab] = useState('uploadData');

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: 'uploadData', label: 'Загрузка данных' },
    { key: 'editData', label: 'Корректировка данных' },
    { key: 'deleteData', label: 'Удаление данных' },
  ];

  const dataColumns = [
    { key: 'accountNumber', label: 'Счет, No. (ключевой атрибут)' },
    { key: 'accountPosition', label: 'Позиция счета (ключевой атрибут)' },
    { key: 'accountYear', label: 'Год счета (ключевой атрибут)' },
    { key: 'serviceId', label: 'ID услуги' },
    { key: 'agreementNumber', label: 'Номер договора' },
    { key: 'accountReflectionDate', label: 'Дата отражения счета' },
    { key: 'serviceVolume', label: 'Объем оказанной услуги' },
    { key: 'costWithoutVAT', label: 'Стоимость без НДС' },
  ];

  const dataValues = [
    {
      accountNumber: 204,
      accountPosition: 'Позиция 1',
      accountYear: 2006,
      serviceId: 'ID 012053',
      agreementNumber: '2006-ABC',
      accountReflectionDate: '01.06.2006',
      serviceVolume: 'полный',
      costWithoutVAT: 1000,
    },
    {
      accountNumber: 1,
      accountPosition: 'Позиция 2',
      accountYear: 2009,
      serviceId: 'ID 012785',
      agreementNumber: '2009-BCE',
      accountReflectionDate: '02.06.2009',
      serviceVolume: 'полный',
      costWithoutVAT: 5000,
    },
    {
      accountNumber: 3004,
      accountPosition: 'Позиция 3',
      accountYear: 2013,
      serviceId: 'ID 00855',
      agreementNumber: '2013-C',
      accountReflectionDate: '01.06.2013',
      serviceVolume: 'полный',
      costWithoutVAT: 12000,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'uploadData':
        return (
          <>
            <div className={styles.uploadData}>
              <div className={styles.chooseFile}>
                <div className={styles.fileInputWrapper}>
                  <input type="file" id="fileInput" className={styles.fileInput} />
                  <label htmlFor="fileInput" className={styles.fileInputLabel}>
                    <div className={styles.fileInputContent}>
                      <span className={styles.fileInputText}>Переместите файл сюда</span>
                      <br />
                      <span className={styles.fileInputOr}>или</span>
                      <br />
                      <span className={styles.fileInputButton}>нажмите</span>
                    </div>
                  </label>
                </div>
                <div className={styles.btn}>Загрзуить файл</div>
              </div>
              <div className="uploadedFiles">
                <MainHeading text="Загруженные файлы" />
                <DataTable
                  data={[
                    {
                      fileName: 'Счет1',
                      fileWeight: '32Кб'
                    },
                    {
                      fileName: 'Счет1',
                      fileWeight: '32Кб'
                    },
                    {
                      fileName: 'Счет1',
                      fileWeight: '32Кб'
                    },
                    {
                      fileName: 'Счет1',
                      fileWeight: '32Кб'
                    },
                    {
                      fileName: 'Счет1',
                      fileWeight: '32Кб'
                    },
                  ]}
                  columns={[
                    {
                      key: 'fileName', label: 'Имя файла'
                    },
                    {
                      key: 'fileWeight', label: 'Вес файла'
                    }
                  ]}
                />
              </div>
            </div>
            <MainHeading text="Таблица с загруженными данными" />
            <DataTable
              data={dataValues}
              columns={dataColumns}
            />
          </>
        );
      case 'editData':
        return (
          <>
            <DataTable
              data={dataValues}
              columns={dataColumns}
            />
            <div className={styles.manageChanges}>
              <div className={styles.btn}>Cохранить изменения</div>
              <div className={styles.btn}>Отменить изменения</div>
            </div>
          </>
        );
      case 'deleteData':
        return (
          <>
            <DataTable
              data={dataValues}
              columns={dataColumns}
            />
            <div className={styles.manageChanges}>
              <div className={styles.btn}>Cохранить изменения</div>
              <div className={styles.btn}>Отменить изменения</div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Header title="Счета на оплату" />
      <NavTabs tabs={tabs} onTabClick={handleTabClick} />
      {renderContent()}
    </div>
  );
}

export default App;
