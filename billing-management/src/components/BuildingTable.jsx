// BuildingTable.jsx
import React from 'react';
import styles from '../styles/components/BuildingTable.module.scss';

const BuildingTable = ({ data, onAddAsset }) => {
  return (
    <div className={styles.tableWrapper}>
      <h2>Массив данных 1. Таблица</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID здания</th>
            <th>Начало владения</th>
            <th>Конец владения</th>
            <th>Конец действия измерения</th>
            <th>Начало действия измерения</th>
            <th>Единица измерения площади</th>
          </tr>
        </thead>
        <tbody>
          {data.map((building) => (
            <tr key={building.id}>
              <td>{building.id}</td>
              <td>{building.startOwnership}</td>
              <td>{building.endOwnership}</td>
              <td>{building.endMeasurement}</td>
              <td>{building.startMeasurement}</td>
              <td>{building.areaUnit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddAsset}>Добавить средство</button>
    </div>
  );
};

export default BuildingTable;
