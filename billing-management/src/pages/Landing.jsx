import LoginForm from "src/components/LoginForm";
import HeaderLend from "src/components/HeaderLend";
import MainSection from "src/components/MainSection";
import Footer from "src/components/Footer";
import RegistrationForm from "src/components/RegistrationForm";

import styles from "src/styles/landing/Landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.landing}>
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

export default Landing;
