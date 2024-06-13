import React, { useState } from "react";

import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import MainHeading from "../components/MainHeading";
import DataTable from "../components/DataTable";
import AddButton from "../components/AddButton";

import cn from "classnames";

import styles from "src/styles/pages/ObjectDistributionPage.module.scss";

function App() {
  const [activeTab, setActiveTab] = useState("buildings");

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const tabs = [
    { key: "buildings", label: "Справочник зданий" },
    { key: "assets", label: "Справочник основных средств" },
    { key: "services", label: "Справочник работ/услуг" },
    { key: "contracts", label: "Справочник договоров" },
  ];

  const columns = [
    { key: "id", label: "ID здания" },
    { key: "startYear", label: "Начало владения" },
    { key: "endYear", label: "Конец владения" },
    { key: "measurementEnd", label: "Конец действия измерения" },
    { key: "measurementStart", label: "Начало действия измерения" },
    { key: "areaUnit", label: "Единица измерения площади" },
  ];

  const data = [
    {
      id: 205,
      startYear: 1995,
      endYear: 1996,
      measurementEnd: "см.файл",
      measurementStart: "см.файл",
      areaUnit: "кв.метр",
    },
    {
      id: 100,
      startYear: 1999,
      endYear: 1996,
      measurementEnd: "см.файл",
      measurementStart: "см.файл",
      areaUnit: "кв.метр",
    },
    {
      id: 1006,
      startYear: 1998,
      endYear: 1996,
      measurementEnd: "см.файл",
      measurementStart: "см.файл",
      areaUnit: "кв.метр",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "buildings":
        return (
          <>
            <h2>Массив данных 1. Таблица</h2>
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <h2>Массив данных 2. Таблица</h2>
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
          </>
        );
      case "assets":
        return (
          <>
            <h2>Таблица</h2>
            <DataTable
              data={[
                {
                  id: 1000,
                  startYear: 2000,
                  endYear: 56,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
          </>
        );
      case "services":
        return (
          <>
            <h2>Таблица</h2>
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
          </>
        );
      case "contracts":
        return (
          <>
            <h2>Таблица</h2>
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
            <AddButton
              label='Добавить средство'
              onClick={() => console.log("Add button clicked")}
            />
            <DataTable
              data={[
                {
                  id: 205,
                  startYear: 1995,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 100,
                  startYear: 1999,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
                {
                  id: 1006,
                  startYear: 1998,
                  endYear: 1996,
                  measurementEnd: "см.файл",
                  measurementStart: "см.файл",
                  areaUnit: "кв.метр",
                },
              ]}
              columns={[
                { key: "id", label: "ID здания" },
                { key: "startYear", label: "Начало владения" },
                { key: "endYear", label: "Конец владения" },
                { key: "measurementEnd", label: "Конец действия измерения" },
                { key: "measurementStart", label: "Начало действия измерения" },
                { key: "areaUnit", label: "Единица измерения площади" },
              ]}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(styles.objectDistribution, "App")}>
      <Header title='Объекты распределения' />
      <NavTabs tabs={tabs} onTabClick={handleTabClick} />
      {renderContent()}
    </div>
  );
}

export default App;
