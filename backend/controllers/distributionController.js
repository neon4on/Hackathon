const { Bill, DistributionObject } = require('../models');
const { Op } = require('sequelize');

const distributeBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    const objects = await DistributionObject.findAll();

    const distributedBills = bills.map((bill) => {
      // Логика распределения
      // Например, распределение по площади зданий и категориям услуг
      const totalArea = objects.reduce((sum, obj) => sum + obj.area, 0);
      const distributedAmount = objects.map((obj) => ({
        ...bill.dataValues,
        distributedAmount: (bill.amount * obj.area) / totalArea,
        objectId: obj.id,
      }));

      return distributedAmount;
    });

    res.json(distributedBills.flat());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  distributeBills,
};
