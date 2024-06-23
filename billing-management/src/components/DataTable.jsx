import PropTypes from "prop-types";

import React from "react";
import styles from "../styles/components/DataTable.module.scss";

import cn from "classnames";

const DataTable = ({ data, columns, setData = () => {}, className = "", edit = false }) => {
  const onAddRow = () => {
    const newRow = {};

    columns.forEach((col) => (newRow[col.key] = "-"));

    setData([...data, newRow]);
  };

  const onRemoveRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);

    setData(newData);
  };

  const onDataChange = (index, key, value) => {
    const newData = [...data];

    newData[index][key] = value;

    setData(newData);
  };

  return (
    <div
      className={cn(styles.dataTable, className, {
        [styles.editableTable]: edit,
      })}
    >
      <div className={styles.dataTableOverflow}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {edit ? (
                      <input
                        value={row[column.key]}
                        onChange={(event) => onDataChange(index, column.key, event.target.value)}
                      />
                    ) : (
                      <span>{row[column.key]}</span>
                    )}
                  </td>
                ))}
                {edit && (
                  <td>
                    <button onClick={() => onRemoveRow(index)}>
                      <img src='icons/trash.svg' />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {edit && (
              <tr>
                <td className={styles.addRow}>
                  <button onClick={onAddRow}>
                    <img src='/icons/plus.svg' />
                    <span>Добавить строку</span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
  columns: PropTypes.array,
  className: PropTypes.string,
  edit: PropTypes.bool,
};

export default DataTable;
