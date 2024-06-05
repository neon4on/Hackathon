import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import axios from 'axios';

const Distribution = () => {
  const handleDistribute = async () => {
    try {
      const response = await axios.post('/api/distribute');
      // Обработай результат распределения
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
        Запуск распределения
      </Button>
    </Container>
  );
};

export default Distribution;
