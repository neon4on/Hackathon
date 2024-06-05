const { Bill } = require('../models');

const getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBill = async (req, res) => {
  const { date, amount } = req.body;

  try {
    const newBill = await Bill.create({ date, amount });
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBills,
  createBill,
};
