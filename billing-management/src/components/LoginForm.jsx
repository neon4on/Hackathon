import React from 'react';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={styles.loginForm}>
      <h2>Форма для входа</h2>
      <form>
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
      <a href="#forgot-password">Забыли пароль? Нажмите сюда</a>
    </div>
  );
};

export default LoginForm;
