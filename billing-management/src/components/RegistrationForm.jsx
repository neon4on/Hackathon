import React, { useState } from "react";
import styles from "../styles/landing/RegistrationForm.module.css";

const RegistrationForm = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("User registered successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }
  };

  return (
    <div className={styles.registrationForm}>
      <h2>Форма для регистрации</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Пароль'
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Повторите пароль'
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
