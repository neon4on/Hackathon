import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "../styles/pages/Bills.module.scss";
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import MainHeading from "../components/MainHeading";
import DataTable from "../components/DataTable";
import * as XLSX from "xlsx";

const App = observer(function () {
  const [activeTab, setActiveTab] = useState("uploadData");
  const [dataValues, setDataValues] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const tabs = [
    { key: "uploadData", label: "Загрузка данных" },
    { key: "editData", label: "Корректировка данных" },
    { key: "deleteData", label: "Удаление данных" },
  ];

  const dataColumns = [
    { key: "accountNumber", label: "Счет, No. (ключевой атрибут)" },
    { key: "accountPosition", label: "Позиция счета (ключевой атрибут)" },
    { key: "accountYear", label: "Год счета (ключевой атрибут)" },
    { key: "serviceId", label: "ID услуги" },
    { key: "agreementNumber", label: "Номер договора" },
    { key: "accountReflectionDate", label: "Дата отражения счета" },
    { key: "serviceVolume", label: "Объем оказанной услуги" },
    { key: "costWithoutVAT", label: "Стоимость без НДС" },
  ];

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet, { header: "A" });

        const formattedData = parsedData.map((row) => {
          return {
            accountNumber: row.A || "0",
            accountPosition: row.B || "0",
            accountYear: row.C || "0",
            serviceId: row.D || "0",
            agreementNumber: row.E || "0",
            accountReflectionDate: row.F || "0",
            serviceVolume: row.G || "0",
            costWithoutVAT: row.H || "0",
          };
        });

        setDataValues([...dataValues, ...formattedData]);
        setUploadedFiles([
          ...uploadedFiles,
          { fileName: selectedFile.name, fileWeight: `${selectedFile.size} KB` },
        ]);
        setSelectedFile(null);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "uploadData":
        return (
          <>
            <div className={styles.uploadData}>
              <div className={styles.chooseFile}>
                <label className={styles.fileInputWrapper}>
                  <div className={styles.fileInputContent}>
                    <div className={styles.fileInputText}>
                      <img src='/icons/plus.svg' />
                      <span>Переместите файл сюда</span>
                    </div>
                    <div className={styles.fileInputOr}>или нажмите</div>
                    <button className={styles.fileInputButton}>Выбрать файл</button>
                  </div>
                  <input
                    type='file'
                    id='fileInput'
                    className={styles.fileInput}
                    onChange={handleFileSelect}
                  />
                </label>
                <div className={styles.loadButton} onClick={handleFileUpload}>
                  Загрузить файл
                </div>
              </div>
              <div className={styles.uploadedFiles}>
                <h3>Загруженные файлы</h3>
                <table>
                  <tbody>
                    {new Array(4).fill("Текст").map((row, index) => (
                      <tr key={index}>
                        <td>
                          <img src='/icons/bills.svg' />
                        </td>
                        <td>{row}</td>
                        <td>{row}</td>
                        <td>
                          <img src='/icons/trash.svg' />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.loadedDataTable}>
              <h2>Текст с загружаемыми данными</h2>
              <DataTable data={dataValues} columns={dataColumns} className={styles.dataTable} />
            </div>
          </>
        );
      case "editData":
        return (
          <>
            <DataTable data={dataValues} columns={dataColumns} />
            <div className={styles.manageChanges}>
              <div className={styles.btn}>Cохранить изменения</div>
              <div className={styles.btn}>Отменить изменения</div>
            </div>
          </>
        );
      case "deleteData":
        return (
          <>
            <DataTable data={dataValues} columns={dataColumns} />
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
    <div className='App'>
      <Header title='Счета на оплату' />
      {renderContent()}
    </div>
  );
});

export default App;
