import React, { useState, useEffect, useRef } from "react";
import themeStore from "src/store/themeStore";
import { observer } from "mobx-react";
import * as d3 from "d3";
import styles from "../styles/pages/Home.module.scss";

const Home = observer(() => {
  const [taskProgress] = useState(0);
  const recentChanges = [
    { id: 252, day: "Пн", time: "12:10" },
    { id: 3, day: "Пн", time: "11:08" },
    { id: 1305, day: "Пн", time: "09:03" },
    { id: 19, day: "Вт", time: "11:48" },
    { id: 500, day: "Ср", time: "15:52" },
  ];

  const importantMessages = [
    { topic: "Задача No.305", day: "Ср", time: "12:10", details: "" },
    {
      topic: "Новые данные",
      day: "Вт",
      time: "11:08",
      details: "Добавлены новые данные к задаче No.101",
    },
    { topic: "Обновление статистики", day: "Вт", time: "09:03", details: "" },
    { topic: "Задача No.63", day: "Пн", time: "11:48", details: "" },
    { topic: "Расчет данных", day: "Пт", time: "15:52", details: "" },
  ];

  const ref = useRef();

  useEffect(() => {
    const root = document.querySelector(":root");
    const rootStyle = root.style;

    const svg = d3.select(ref.current).attr("width", 146).attr("height", 146);

    const g = svg.append("g").attr("transform", "translate(73, 73)");

    const arc = d3.arc().innerRadius(63).outerRadius(73).startAngle(0);

    const background = g
      .append("path")
      .datum({ endAngle: 2 * Math.PI })
      .style("fill", "#d9d9d9")
      .attr("d", arc);

    const foreground = g
      .append("path")
      .datum({ endAngle: (taskProgress / 100) * 2 * Math.PI })
      .style("fill", "#4caf50")
      .attr("d", arc);

    g.append("path")
      .datum({ endAngle: (1 - taskProgress / 100) * 2 * Math.PI })
      .style("fill", "#ffeb3b")
      .attr("d", arc)
      .attr("transform", `rotate(${taskProgress * 3.6})`);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("font-size", "24px")
      .style("fill", "#E3F3E4")
      .text(`${taskProgress}%`);
  }, [taskProgress]);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Панель управления</h1>
        <label>
          <input type='text' placeholder='Поиск' />
        </label>
      </div>
      <div className={styles.content}>
        <div className={styles.progressHeader}>
          <h2>Статус задачи</h2>
          <label>
            <input type='text' placeholder='Номер' />
          </label>
        </div>
        <h2 className={styles.recentChangesHeader}>Последние действия</h2>
        <div className={styles.messagesHeader}>
          <h2>Уведомления</h2>
          <div className={styles.newMessage}></div>
        </div>
        <div className={styles.progress}>
          <h3>Прогресс выполнения</h3>
          <div className={styles.progressWrapper}>
            <svg ref={ref}></svg>
            <div className={styles.progressText}>
              <div className={styles.weeklyChange}>
                <p>Динамика за неделю</p>
                <div className={styles.weeklyPercents}>
                  <div className={styles.up}>
                    <span>21,6%</span>
                    <img src='/icons/green-arrow.svg' alt='arrow' />
                  </div>
                  <div className={styles.down}>
                    <span>13,7%</span>
                    <img src='/icons/yellow-arrow.svg' alt='arrow' />
                  </div>
                </div>
              </div>
              <div className={styles.legend}>
                <p className={styles.ready}>готово</p>
                <p className={styles.left}>осталось</p>
              </div>
            </div>
          </div>
          <p className={styles.progressDisclaimer}>Статус показан на сегодняшний день</p>
        </div>
        <div className={styles.recentChanges}>
          <h3>Список последних изменений</h3>
          <table>
            <thead>
              <tr>
                <th>Задача, No.</th>
                <th>День</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              {recentChanges.map((change, index) => (
                <tr key={index}>
                  <td>{change.id}</td>
                  <td>{change.day}</td>
                  <td>{change.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.messages}>
          <h3>Важные сообщения</h3>
          <table>
            <thead>
              <tr>
                <th>Тема</th>
                <th>День</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              {importantMessages.map((message, index) => (
                <tr key={index}>
                  <td>{message.topic}</td>
                  <td>{message.day}</td>
                  <td>{message.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default Home;
