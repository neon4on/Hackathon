import React, { useState } from 'react';
import styles from "../styles/pages/Bills.module.scss";
import Header from '../components/Header';
import NavTabs from '../components/NavTabs';
import MainHeading from '../components/MainHeading';
import DataTable from '../components/DataTable';
import * as XLSX from 'xlsx';

function App() {
  const [activeTab, setActiveTab] = useState('uploadData');
  const [dataValues, setDataValues] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 'A' });

        const formattedData = parsedData.map((row) => {
          return {
            accountNumber: row.A || '0',
            accountPosition: row.B || '0',
            accountYear: row.C || '0',
            serviceId: row.D || '0',
            agreementNumber: row.E || '0',
            accountReflectionDate: row.F || '0',
            serviceVolume: row.G || '0',
            costWithoutVAT: row.H || '0',
          };
        });

        setDataValues([...dataValues, ...formattedData]);
        setUploadedFiles([...uploadedFiles, { fileName: selectedFile.name, fileWeight: `${selectedFile.size} KB` }]);
        setSelectedFile(null);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'uploadData':
        return (
          <>
            <div className={styles.uploadData}>
              <div className={styles.chooseFile}>
                <div className={styles.fileInputWrapper}>
                  <input type="file" id="fileInput" className={styles.fileInput} onChange={handleFileSelect} />
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
                <div className={styles.btn} onClick={handleFileUpload}>Загрузить файл</div>
              </div>
              <div className="uploadedFiles">
                <MainHeading text="Загруженные файлы" />
                <DataTable
                  data={uploadedFiles}
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