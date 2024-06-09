import { distributeBills } from 'src/api/api';
import { useState } from 'react';

import DistributionChart from 'src/components/DistributionChart';

import styles from 'src/styles/pages/Distribution.module.scss'

const Distribution = () => {
  const [distributedBills, setDistributedBills] = useState([]);

  const handleDistribute = async () => {
    try {
      const response = await distributeBills();
      setDistributedBills(response.data);
    } catch (error) {
      console.error('Error distributing bills:', error);
    }
  };

  return (
    <div className={styles.distribution}>
      <h1>
        Distribution
      </h1>
      <button onClick={handleDistribute}>
        Start Distribution
      </button>
      {distributedBills.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Distributed Amount</th>
                <th>Object ID</th>
              </tr>
            </thead>
            <tbody>
              {distributedBills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.date}</td>
                  <td>{bill.amount}</td>
                  <td>{bill.distributedAmount}</td>
                  <td>{bill.objectId}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <DistributionChart data={distributedBills} />
        </>
      )}
    </div>
  );
};

export default Distribution;
