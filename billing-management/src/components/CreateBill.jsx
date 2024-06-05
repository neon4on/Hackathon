import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { createBill } from '../api/api';

const CreateBill = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bill = { date, amount };
    try {
      await createBill(bill);
      // Очистить поля ввода после успешного создания
      setDate('');
      setAmount('');
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Bill
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </form>
    </Container>
  );
};

export default CreateBill;
