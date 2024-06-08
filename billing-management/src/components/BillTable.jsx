import{ useEffect, useState } from 'react';
import axios from 'axios';

const BillTable = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get('/api/bills');
        setBills(response.data || []);
      } catch (error) {
        console.error('Error fetching bills:', error);
        setBills([]);
      }
    };
    fetchBills();
  }, []);

  return (
    <table>
      <thead>
        <th>
          <td>ID</td>
          <td>Дата</td>
          <td>Количество</td>
        </th>
      </thead>
      <tbody>
        {Array.isArray(bills) &&
          bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.date}</td>
              <td>{bill.amount}</td>
            </tr>
        ))}
      </tbody>
  </table>
  );  
};

export default BillTable;
