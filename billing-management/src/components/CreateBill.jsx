import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { createBill } from 'api/api';

import styles from 'styles/components/CreateBill.module.scss';

const CreateBill = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bill = { date, amount };
    try {
      await createBill(bill);
      setDate('');
      setAmount('');
      enqueueSnackbar('Bill created successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Error creating bill.', { variant: 'error' });
      console.error('Error creating bill:', error);
    }
  };

  return (
    <div>
      <h1>
        Create Bill
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button variant="contained" color="primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
