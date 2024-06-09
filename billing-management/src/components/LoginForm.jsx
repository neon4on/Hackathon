import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isResetPassword) {
      try {
        const response = await fetch('http://localhost:3000/api/password-reset/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email }),
        });

        if (response.ok) {
          alert('Password reset email sent');
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to send password reset email');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to send password reset email');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('token', token);
          navigate('/bills');
        } else {
          const data = await response.json();
          alert(data.error || 'Invalid credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Login failed');
      }
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>{isResetPassword ? 'Восстановление пароля' : 'Форма для входа'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        {!isResetPassword && (
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isResetPassword ? 'Отправить' : 'Войти'}</button>
      </form>
      <a href="#" onClick={() => setIsResetPassword(!isResetPassword)}>
        {isResetPassword ? 'Вспомнили пароль? Войти' : 'Забыли пароль? Нажмите сюда'}
      </a>
    </div>
  );
};

export default LoginForm;
