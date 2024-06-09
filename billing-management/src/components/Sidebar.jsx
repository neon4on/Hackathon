import { Link } from 'react-router-dom';

import styles from '../styles/components/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <Link to="/home">Главная страница</Link>
      <Link to="/bills">Счета на оплату</Link>
      <Link to="/distribution">Объекты распределения</Link>
      <Link to="/distribution">Управление распределение</Link>
      <Link to="/distributedpaymentinvoices">Распределённые счета на оплату</Link>
      <Link to="/forecast">Прогнозирование и контроль затрат</Link>
    </aside>
  );
};

export default Sidebar;
