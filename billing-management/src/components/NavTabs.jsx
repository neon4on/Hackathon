import React, { useState } from 'react';
import '../styles/components/NavTabs.module.scss';

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
            className={activeTab === tab.key ? 'active' : ''}>
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavTabs;
