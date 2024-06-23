import React from "react";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.scss";

import cn from "classnames";

import themeStore from "src/store/themeStore";

const navLinks = [
  {
    to: "/home",
    name: "Главная страница",
    src: "/icons/home.svg",
    srcActive: "/icons/home-active.svg",
    alt: "Home",
  },
  {
    to: "/bills",
    name: "Счета на оплату",
    src: "/icons/bills.svg",
    srcActive: "/icons/bills-active.svg",
    alt: "Bills",
  },
  {
    to: "/objectdistributionpage",
    name: "Объекты распределения",
    src: "/icons/distribution.svg",
    srcActive: "/icons/distribution-active.svg",
    alt: "ObjectDistributionPage",
  },
  {
    to: "/DistributionManagement",
    name: "Управление распределение",
    src: "/icons/control.svg",
    srcActive: "/icons/control-active.svg",
    alt: "Control",
  },
  {
    to: "/distributedpaymentinvoices",
    name: "Распределённые счета на оплату",
    src: "/icons/distributed_payment_invoices.svg",
    srcActive: "/icons/distributed_payment_invoices-active.svg",
    alt: "Distributed Payment Invoices",
  },
  {
    to: "/forecast",
    name: "Прогнозирование и контроль затрат",
    src: "/icons/forecast.svg",
    srcActive: "/icons/forecast-active.svg",
    alt: "Forecast",
  },
];

const Sidebar = observer(() => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Blood Blade</h1>
      {navLinks.map((link) => (
        <NavLink
          className={({ isActive }) => [isActive ? styles.activeLink : "", styles.link].join(" ")}
          to={link.to}
          key={link.name}
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? link.srcActive : link.src}
                alt={link.alt}
                className={styles.icon}
              />
              <span>{link.name}</span>
            </>
          )}
        </NavLink>
      ))}
      <div className={styles.theme}>
        <div
          className={cn(styles.switch, {
            [styles.light]: themeStore.theme === "light",
            [styles.dark]: themeStore.theme === "dark",
          })}
        ></div>
        <button onClick={() => themeStore.setDark()}>
          <img src='/icons/dark.svg' />
        </button>
        <button onClick={() => themeStore.setLight()}>
          <img src='/icons/light.svg' />
        </button>
      </div>
    </aside>
  );
});

export default Sidebar;
