import React from 'react';
import HeaderLend from '../components/HeaderLend';
import MainSection from '../components/MainSection';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <HeaderLend />
      <MainSection />
      <div className={styles.forms}>
        <RegistrationForm />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
