const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Пример данных для тестирования
  const distributionObjects = [
    { id: 1, name: 'Object 1', description: 'Description 1' },
    { id: 2, name: 'Object 2', description: 'Description 2' },
    // Добавьте больше данных по необходимости
  ];
  res.json(distributionObjects); // Возвращаем массив объектов
});

router.post('/', (req, res) => {
  // Логика для создания нового объекта распределения
  res.send('Создание объекта распределения');
});

router.put('/:id', (req, res) => {
  // Логика для обновления объекта распределения
  res.send(`Обновление объекта распределения с id ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  // Логика для удаления объекта распределения
  res.send(`Удаление объекта распределения с id ${req.params.id}`);
});

module.exports = router;
