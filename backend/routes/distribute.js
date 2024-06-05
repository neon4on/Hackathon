const express = require('express');
const router = express.Router();

// Добавьте контроллеры для распределения счетов

router.post('/', (req, res) => {
  // Логика распределения счетов
  res.json({ message: 'Распределение выполнено' });
});

module.exports = router;
