import React, { useState } from "react";
import styles from "../styles/components/NavTabs.module.scss";

import cn from "classnames";

const NavTabs = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const handleTabClick = (key) => {
    setActiveTab(key);
    onTabClick(key);
  };

  return (
    <nav>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={cn({ [styles.active]: activeTab === tab.key })}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavTabs;
