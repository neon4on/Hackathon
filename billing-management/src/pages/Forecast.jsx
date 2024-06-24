import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "../styles/pages/Forecast.module.scss";

const Forecast = observer(() => {
  const [selectedTab, setSelectedTab] = useState("current");
  const [state, setState] = useState("default");
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleRowClick = () => {
    setState("choose");
  };

  const handleButtonClick = () => {
    setState("pressed");
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };

  const dataCurrent = [
    { id: "0523", paid: "5 000 000", toBePaid: "30 000" },
    { id: "05003", paid: "25 326 000", toBePaid: "385 000" },
    { id: "AJD-6321", paid: "250 000", toBePaid: "254 000" },
  ];

  const dataForecast = [
    { id: "0562", period: "05.07.24-02.07.26", planned: "5 000 236", additional: "256 012" },
    { id: "ASKNJL-3524", period: "18.09.24-31.08.25", planned: "500 236", additional: "30 540" },
    {
      id: "04sd562",
      period: "15.08.24-02.07.245",
      planned: "553 000 205",
      additional: "10 250 000",
    },
  ];

  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <h2>Прогнозирование и контроль затрат</h2>
        <div className={styles.tabs}>
          <button
            className={selectedTab === "current" ? styles.active : ""}
            onClick={() => handleTabChange("current")}
          >
            Текущие затраты
          </button>
          <button
            className={selectedTab === "forecast" ? styles.active : ""}
            onClick={() => handleTabChange("forecast")}
          >
            Прогнозирование затрат
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {selectedTab === "current" && (
          <>
            <div className={styles.chartSection}>
              <div className={styles.chart}>
                <h3>График расходов</h3>
                {/* Вставьте компонент графика здесь */}
              </div>
              <div className={styles.projectStatus}>
                <h3>Проект 1A-23341: динамика</h3>
                <div className={styles.circleChart}>
                  <span>70%</span>
                  <p>Статус показан на сегодняшний день</p>
                </div>
                <div className={styles.projectDetails}>
                  <p>
                    <strong>ID проекта:</strong> 0523
                  </p>
                  <p>
                    <strong>Оплачено:</strong> 5 000 000
                  </p>
                  <p>
                    <strong>К оплате:</strong> 30 000
                  </p>
                </div>
              </div>
              <div className={styles.expenses}>
                <h3>Расходы</h3>
                <p>1,5 млн.</p>
              </div>
            </div>

            <div className={styles.dynamicsSection}>
              <div className={styles.dynamics}>
                <h3>Динамика</h3>
                <p>1 009</p>
                <p>Текущая неделя</p>
              </div>
              <div className={styles.dynamics}>
                <h3>Динамика</h3>
                <p>2 539</p>
                <p>Текущая неделя</p>
              </div>
            </div>

            <div className={styles.tableSection}>
              <table>
                <thead>
                  <tr>
                    <th>ID проекта</th>
                    <th>Оплачено</th>
                    <th>К оплате</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCurrent.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.paid}</td>
                      <td>{row.toBePaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.expensesGraph}>
              <h3>Затраты за июнь (от плана)</h3>
              <div className={styles.bars}>
                <div className={styles.bar} style={{ width: "70%" }}></div>
                <div
                  className={styles.bar}
                  style={{ width: "30%", backgroundColor: "#FFD700" }}
                ></div>
              </div>
            </div>
          </>
        )}
        {selectedTab === "forecast" && (
          <>
            <div className={styles.tableSection}>
              <table>
                <thead>
                  <tr>
                    <th>ID проекта</th>
                    <th>Период</th>
                    <th>Планируемые затраты</th>
                    <th>Дополнительные расходы</th>
                  </tr>
                </thead>
                <tbody>
                  {dataForecast.map((row, index) => (
                    <tr key={index} onClick={handleRowClick}>
                      <td>{row.id}</td>
                      <td>{row.period}</td>
                      <td>{row.planned}</td>
                      <td>{row.additional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {state === "choose" && (
              <button className={styles.predictButton} onClick={handleButtonClick}>
                Запустить прогноз
              </button>
            )}
            {state === "pressed" && (
              <div className={styles.expandedContent}>
                <div className={styles.dynamicsSection}>
                  <div className={styles.dynamics}>
                    <h3>Динамика</h3>
                    <p>1 009</p>
                    <p>Текущая неделя</p>
                  </div>
                  <div className={styles.dynamics}>
                    <h3>Динамика</h3>
                    <p>2 539</p>
                    <p>Текущая неделя</p>
                  </div>
                </div>
                <div className={styles.chartSection}>
                  <div className={styles.chart}>
                    <h3>Динамика затрат</h3>
                    {/* Вставьте компонент графика здесь */}
                  </div>
                  <div className={styles.exportSection}>
                    <button onClick={() => handleFormatSelect("xls")}>Экспортировать в XLS</button>
                    <button onClick={() => handleFormatSelect("xlsx")}>
                      Экспортировать в XLSX
                    </button>
                    {selectedFormat && (
                      <div className={styles.exportOptions}>
                        <input
                          type='radio'
                          id='xls'
                          name='format'
                          value='xls'
                          checked={selectedFormat === "xls"}
                          readOnly
                        />
                        <label htmlFor='xls'>XLS</label>
                        <input
                          type='radio'
                          id='xlsx'
                          name='format'
                          value='xlsx'
                          checked={selectedFormat === "xlsx"}
                          readOnly
                        />
                        <label htmlFor='xlsx'>XLSX</label>
                        <input type='text' placeholder='сведите No. строки' />
                        <input type='text' placeholder='поведите No. строки' />
                        <button>Экспортировать</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default Forecast;
