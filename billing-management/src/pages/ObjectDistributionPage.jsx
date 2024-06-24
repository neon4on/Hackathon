import React, { useEffect, useState } from "react";
import {
  buildingsTable,
  assetsTable,
  servicesTable,
  contractsTable,
  columns,
} from "../lib/objectDistributionTables";
import { observer } from "mobx-react";

import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import DataTable from "../components/DataTable";
import AddButton from "../components/AddButton";

import cn from "classnames";

import styles from "src/styles/pages/ObjectDistributionPage.module.scss";

const tabs = [
  { key: "buildings", label: "Справочник зданий" },
  { key: "assets", label: "Справочник основных средств" },
  { key: "services", label: "Справочник работ/услуг" },
  { key: "contracts", label: "Справочник договоров" },
];

const App = observer(function () {
  const [activeTab, setActiveTab] = useState("buildings");
  const [editMoode, setEditMode] = useState(false);
  const [data, setData] = useState([...buildingsTable]);

  const openEdit = () => setEditMode(true);
  const closeEdit = () => setEditMode(false);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (activeTab === "buildings") {
      setData(buildingsTable);
    }
    if (activeTab === "assets") {
      setData(assetsTable);
    }
    if (activeTab === "services") {
      setData(servicesTable);
    }
    if (activeTab === "contracts") {
      setData(contractsTable);
    }

    setEditMode(false);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "buildings":
        return (
          <>
            {editMoode === false ? (
              <AddButton label='Редактировать' onClick={openEdit} />
            ) : (
              <div className={styles.closeEditButtons}>
                <AddButton label='Сохранить' onClick={closeEdit} />
              </div>
            )}
            <DataTable data={data} setData={setData} columns={columns} edit={editMoode} />
          </>
        );

      case "assets":
        return (
          <>
            {editMoode === false ? (
              <AddButton label='Редактировать' onClick={openEdit} />
            ) : (
              <div className={styles.closeEditButtons}>
                <AddButton label='Сохранить' onClick={closeEdit} />
              </div>
            )}
            <DataTable data={data} setData={setData} columns={columns} edit={editMoode} />
          </>
        );

      case "services":
        return (
          <>
            {editMoode === false ? (
              <AddButton label='Редактировать' onClick={openEdit} />
            ) : (
              <div className={styles.closeEditButtons}>
                <AddButton label='Сохранить' onClick={closeEdit} />
              </div>
            )}
            <DataTable data={data} setData={setData} columns={columns} edit={editMoode} />
          </>
        );

      case "contracts":
        return (
          <>
            {editMoode === false ? (
              <AddButton label='Редактировать' onClick={openEdit} />
            ) : (
              <div className={styles.closeEditButtons}>
                <AddButton label='Сохранить' onClick={closeEdit} />
              </div>
            )}
            <DataTable data={data} setData={setData} columns={columns} edit={editMoode} />
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
});

export default App;
