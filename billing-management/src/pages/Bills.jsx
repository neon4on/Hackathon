import React from 'react';
import { Container, Typography } from '@mui/material';
import BillTable from '../components/BillTable';

const Bills = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bills
      </Typography>
      <BillTable />
    </Container>
  );
};

export default Bills;
