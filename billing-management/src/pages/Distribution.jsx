import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Distribution
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDistribute}>
        Start Distribution
      </Button>
      {distributedBills.length > 0 && (
        <>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Distributed Amount</TableCell>
                  <TableCell>Object ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {distributedBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>{bill.distributedAmount}</TableCell>
                    <TableCell>{bill.objectId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <DistributionChart data={distributedBills} />
        </>
      )}
    </Container>
  );
};

export default Distribution;
