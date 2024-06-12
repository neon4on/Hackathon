import React from "react";
import styles from "../styles/components/DataTable.module.scss";

import cn from "classnames";

const DataTable = ({ data, columns, className = "" }) => {
  return (
    <div className={cn(styles.dataTable, className)}>
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
                  <td key={column.key}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
