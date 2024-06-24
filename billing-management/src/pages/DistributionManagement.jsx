import React, { useState } from "react";
import { observer } from "mobx-react";

import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import MainHeading from "../components/MainHeading";
import DataTable from "../components/DataTable";
import AddButton from "../components/AddButton";

const App = observer(function () {
  const [activeTab, setActiveTab] = useState("management");

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: "management", label: "Управление" },
    { key: "history", label: "История" },
  ];

  const columns = [
    { key: "Name", label: "Компания" },
    { key: "Bill", label: "Счет, No. (ключевой атрибут)" },
    { key: "PositonBill", label: "Позиция счета (ключевой атрибут)" },
    { key: "YearBill", label: "Год счета (ключевой атрибут)" },
    { key: "PositionDistribution", label: "Позиция распределения, No. (ключевой атрибут)" },
    { key: "Data", label: "Дата отражения счета в учётной системе" },
    { key: "IdAgreement", label: "ID договора" },
    { key: "IdServices", label: "ID услуги" },
    { key: "ClasServices", label: "Класс услуги" },
    { key: "Bulding", label: "Здание" },
    { key: "Square", label: "Площадь" },
    { key: "IdMainBill", label: "ID основного средства" },
    { key: "ClassMainBill", label: "Класс основного средства" },
    { key: "SignUseMain", label: "Признак «Использования в основной деятельности»" },
    { key: "SignUseWay", label: "Признак «Способ использования»" },
    { key: "DistributionSumMain", label: "Распределенная сумма на основное средство" },
    { key: "BillMainBook", label: "Счёт главной книги" },
  ];

  const data = [
    {
      Name: 205,
      Bill: 1995,
      PositonBill: 1996,
      YearBill: "см.файл",
      PositionDistribution: "см.файл",
      Data: "кв.метр",
      IdAgreement: 205,
      IdServices: 1995,
      ClasServices: 1996,
      Bulding: "см.файл",
      Square: "см.файл",
      IdMainBill: "кв.метр",
      ClassMainBill: 205,
      SignUseMain: 1995,
      SignUseWay: 1996,
      DistributionSumMain: "см.файл",
      BillMainBook: "см.файл",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "management":
        return (
          <>
            <MainHeading text='Массив данных 1. Таблица' />
            <DataTable data={data} columns={columns} />
            <AddButton
              label='Экспортировать в XLS/XLSX'
              onClick={() => console.log("Add button clicked")}
            />
          </>
        );
      case "history":
        return (
          <>
            <DataTable
              data={[
                {
                  id: 1,
                  data: "13.01.2004",
                  status: "Gool",
                },
                {
                  id: 2,
                  data: "13.01.2004",
                  status: "Shah",
                },
                {
                  id: 3,
                  data: "13.01.2004",
                  status: "Mat",
                },
                {
                  id: 4,
                  data: "13.01.2004",
                  status: "TachDaun",
                },
              ]}
              columns={[
                { key: "id", label: "ID распределения" },
                { key: "data", label: "Дата Распределения" },
                { key: "status", label: "Статус репределения" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='App'>
      <Header title='Управление распределением' />
      <NavTabs tabs={tabs} onTabClick={handleTabClick} />
      {renderContent()}
    </div>
  );
});

export default App;
