import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from "src/styles/pages/Home.module.scss";

const Home = () => {
  const [taskProgress] = useState(0);
  const recentChanges = [
    { id: 252, day: 'Пн', time: '12:10' },
    { id: 3, day: 'Пн', time: '11:08' },
    { id: 1305, day: 'Пн', time: '09:03' },
    { id: 19, day: 'Вт', time: '11:48' },
    { id: 500, day: 'Ср', time: '15:52' },
  ];

  const importantMessages = [
    { topic: 'Задача No.305', day: 'Ср', time: '12:10', details: '' },
    { topic: 'Новые данные', day: 'Вт', time: '11:08', details: 'Добавлены новые данные к задаче No.101' },
    { topic: 'Обновление статистики', day: 'Вт', time: '09:03', details: '' },
    { topic: 'Задача No.63', day: 'Пн', time: '11:48', details: '' },
    { topic: 'Расчет данных', day: 'Пт', time: '15:52', details: '' },
    
  ];

  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 200)
      .attr('height', 200);

    const g = svg.append('g')
      .attr('transform', 'translate(100, 100)');

    const arc = d3.arc()
      .innerRadius(70)
      .outerRadius(90)
      .startAngle(0);

    const background = g.append('path')
      .datum({ endAngle: 2 * Math.PI })
      .style('fill', '#d9d9d9')
      .attr('d', arc);

    const foreground = g.append('path')
      .datum({ endAngle: (taskProgress / 100) * 2 * Math.PI })
      .style('fill', '#4caf50')
      .attr('d', arc);

    g.append('path')
      .datum({ endAngle: (1 - (taskProgress / 100)) * 2 * Math.PI })
      .style('fill', '#ffeb3b')
      .attr('d', arc)
      .attr('transform', `rotate(${taskProgress * 3.6})`);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '24px')
      .style('fill', '#ffffff')
      .text(`${taskProgress}%`);
  }, [taskProgress]);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h2>Панель управления</h2>
        <input type="text" placeholder="номер" />
      </div>
      <div className={styles.content}>
        <div className={styles.taskStatus}>
          <h3>Прогресс выполнения</h3>
          <div className={styles.progressWrapper}>
            <svg ref={ref}></svg>
            <div className={styles.progressText}>
              <div className={styles.weeklyChange}>
                <p>Динамика за неделю</p>
                <p className={styles.weeklyPercents}><span className={styles.up}>21,6% &#x2191;</span> <span className={styles.down}>13,7% &#x2193;</span></p>
              </div>
              <div className={styles.legend}>
                <div>
                  <span className={styles.greenBox}></span>
                  <p>готово</p>
                </div>
                <div>
                  <span className={styles.yellowBox}></span>
                  <p>осталось</p>
                </div>
              </div>
            </div>
          </div>
          <p>Статус показан на сегодняшний день</p>
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
        <div className={styles.importantMessages}>
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
};

export default Home;
