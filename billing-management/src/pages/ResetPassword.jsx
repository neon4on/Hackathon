import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [form, setForm] = useState({ newPassword: '', confirmNewPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/password-reset/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });

      if (response.ok) {
        alert('Password reset successful');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to reset password');
    }
  };

  return (
    <div className={styles.resetPasswordForm}>
      <h2>Восстановление пароля</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="Новый пароль"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Подтвердите новый пароль"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Сменить пароль</button>
      </form>
    </div>
  );
};

export default ResetPassword;
