import { Link } from 'react-router-dom';
import React from 'react';

import styles from 'styles/components/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside variant="permanent">
      <Link to="/">
        Home
      </Link>
      <Link to="/bills">
        Bills
      </Link>
      <Link to="/distribution">
        Distribution
      </Link>
      <Link to="/forecast">
        Forecast
      </Link>
      <Link to="/create-bill">
        Create Bill
      </Link>
      <Link to="/distribution-objects">
        Distribution Objects
      </Link>
    </aside>
  );
};

export default Sidebar;
