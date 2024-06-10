import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Link to="/home">
        <img src="/icons/home.svg" alt="Home" className={styles.icon} />
        Главная страница
      </Link>
      <Link to="/bills">
        <img src="/icons/bills.svg" alt="Bills" className={styles.icon} />
        Счета на оплату
      </Link>
      <Link to="/objectdistributionpage">
        <img src="/icons/distribution.svg" alt="ObjectDistributionPage" className={styles.icon} />
        Объекты распределения
      </Link>
      <Link to="/DistributionManagement">
        <img src="/icons/control.svg" alt="Control" className={styles.icon} />
        Управление распределение
      </Link>
      <Link to="/distributedpaymentinvoices">
        <img
          src="/icons/distributed_payment_invoices.svg"
          alt="Distributed Payment Invoices"
          className={styles.icon}
        />
        Распределённые счета на оплату
      </Link>
      <Link to="/forecast">
        <img src="/icons/forecast.svg" alt="Forecast" className={styles.icon} />
        Прогнозирование и контроль затрат
      </Link>
    </aside>
  );
};

export default Sidebar;
