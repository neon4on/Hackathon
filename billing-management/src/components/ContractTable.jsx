// ContractTable.jsx
import React from 'react';
import styles from '../styles/components/ContractTable.module.scss';

const ContractTable = ({ data, onAddAsset }) => {
  return (
    <div className={styles.tableWrapper}>
      <h2>Массив данных 2. Таблица</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID договора</th>
            <th>ID здания</th>
            <th>Дата начала действия связи</th>
            <th>Дата окончания действия связи</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.buildingId}</td>
              <td>{contract.startDate}</td>
              <td>{contract.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddAsset}>Добавить средство</button>
    </div>
  );
};

export default ContractTable;
