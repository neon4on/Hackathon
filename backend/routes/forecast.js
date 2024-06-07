const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const forecastData = [
    { date: '2023-06-01', predicted_amount: 1000 },
    { date: '2023-07-01', predicted_amount: 1500 },
    // Добавьте больше данных по необходимости
  ];
  res.json(forecastData);
});

module.exports = router;
