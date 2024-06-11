import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.scss";

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

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Имя</h1>
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
    </aside>
  );
};

export default Sidebar;
