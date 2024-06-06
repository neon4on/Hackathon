import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

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
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(bills) &&
            bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>{bill.id}</TableCell>
                <TableCell>{bill.date}</TableCell>
                <TableCell>{bill.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BillTable;
