// ObjectTable.jsx
import React from 'react';
import styles from '../styles/components/ObjectTable.module.scss';

const ObjectTable = ({ data, isExtendedView, onAddContract, onAddAsset }) => {
  return (
    <div className={styles.tableWrapper}>
      <h2>Объекты распределения</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID договора</th>
            <th>Класс объекта</th>
            <th>Площадь</th>
            {isExtendedView && (
              <>
                <th>Признак использования в основной деятельности</th>
                <th>Признак "Способ использования в аренде, не в аренде"</th>
                <th>ID здания</th>
                <th>Дата начала действия связи с зданием</th>
                <th>Дата окончания действия связи с зданием</th>
                <th>Дата ввода в эксплуатацию</th>
                <th>Дата вывода из эксплуатации</th>
                <th>Площадь</th>
                <th>Единица измерения площади</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((object) => (
            <tr key={object.id}>
              <td>{object.id}</td>
              <td>{object.class}</td>
              <td>{object.area}</td>
              {isExtendedView && (
                <>
                  <td>{object.mainActivity}</td>
                  <td>{object.rentalStatus}</td>
                  <td>{object.buildingId}</td>
                  <td>{object.startDate}</td>
                  <td>{object.endDate}</td>
                  <td>{object.commissioningDate}</td>
                  <td>{object.decomissioningDate}</td>
                  <td>{object.area}</td>
                  <td>{object.areaUnit}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isExtendedView ? (
        <button onClick={onAddAsset}>Добавить средство</button>
      ) : (
        <button onClick={onAddContract}>Добавить договор</button>
      )}
    </div>
  );
};

export default ObjectTable;
