import React from 'react';
import styles from '../styles/RegistrationForm.module.css';

const RegistrationForm = () => {
  return (
    <div className={styles.registrationForm}>
      <h2>Форма для регистрации</h2>
      <form>
        <input type="text" placeholder="Логин (Телефон / E-mail)" />
        <input type="password" placeholder="Пароль" />
        <input type="password" placeholder="Повторите пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
