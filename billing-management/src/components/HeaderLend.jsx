import React from 'react';
import styles from '../styles/HeaderLend.module.css'
import logo from '../images/logo.svg'

const HeaderLend = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="СБЕР БАНК" className={styles.logo} />
      <nav>
        <ul className={styles.navList}>
          <li><a href="#about">О сервисе</a></li>
          <li><a href="#cabinet">Личный кабинет</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderLend;
