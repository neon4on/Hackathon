import React from 'react';
import '../styles/components/PageHeader.module.scss';

const PageHeader = () => {
  return (
    <header className="page-header">
      <h1>Объекты распределения</h1>
      <nav>
        <ul>
          <li>Справочник зданий</li>
          <li>Справочник основных средств</li>
          <li>Справочник работ/услуг</li>
          <li>Справочник договоров</li>
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
