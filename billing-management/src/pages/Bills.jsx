import BillTable from 'components/BillTable';

import styles from 'styles/pages/Bills.module.scss';

const Bills = () => {
  return (
    <div>
      <h1 className={styles.title}>Bills</h1>
      <BillTable />
    </div>
  );
};

export default Bills;
