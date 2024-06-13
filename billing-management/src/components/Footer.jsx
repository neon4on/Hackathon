import React from "react";
import styles from "../styles/landing/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>© 1993—2024 ОАО «Сбер Банк»</div>
      <div className={styles.links}>
        <ul>
          <li>
            <p>Адрес:</p>
            <p>
              Россия, Москва, 117997, <br /> ул. Вавилова, 19
            </p>
          </li>
          <li>
            <p>E-mail: </p>
            <a href='mailto:sberservice@support.ru'>sberservice@support.ru</a>
          </li>
          <li>
            <p>Городской номер:</p>
            <a href='tel:+74955005550'>+7 495 500-55-50</a>
          </li>
          <li>
            <p>Мобильный номер:</p>
            <a href='tel:900'>900</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
