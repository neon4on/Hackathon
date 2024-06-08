import React from 'react';
import styles from '../styles/MainSection.module.css';

const MainSection = () => {
    return (
        <div className={styles.background}>
            <div className={styles.main}>
                <h1>Сервис для распределения и расчета <br /> эффективности расходов</h1>
                <p>Добро пожаловать в программу, позволяющую удобно распределять
                    <br /> входящие счета на оплату различных услуг по зданиям и основным средствам</p>
                <button className={styles.startButton}>Начать</button>
            </div>
        </div>
    );
};

export default MainSection;
