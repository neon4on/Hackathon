import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { fetchForecast } from '../api/api';

const Forecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const response = await fetchForecast();
        setForecast(response.data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };
    getForecast();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Forecast
      </Typography>
      {forecast.length > 0 && (
        <Paper style={{ padding: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Predicted Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forecast.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.predicted_amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Forecast;
