import { useState } from 'react';
import { distributeBills } from '../api/api';
import DistributionChart from '../components/DistributionChart';

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
    <div>
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
              <th>
                <td>ID</td>
                <td>Date</td>
                <td>Amount</td>
                <td>Distributed Amount</td>
                <td>Object ID</td>
              </th>
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
