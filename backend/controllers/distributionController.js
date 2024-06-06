const { Bill } = require('../models');
const { Op } = require('sequelize');

const distributeBills = async (req, res) => {
  try {
    // Логика распределения счетов
    // Пример: распределение суммы по определенным критериям

    const bills = await Bill.findAll();

    // Пример логики распределения
    const distributedBills = bills.map((bill) => {
      // Логика распределения
      // Например, распределение по зданиям
      return {
        ...bill.dataValues,
        distributedAmount: bill.amount * 0.5, // Пример расчета распределенной суммы
      };
    });

    res.json(distributedBills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  distributeBills,
};
