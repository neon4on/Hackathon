const { DistributionObject } = require('../models');

const getDistributionObjects = async (req, res) => {
  try {
    const objects = await DistributionObject.findAll();
    res.json(objects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDistributionObject = async (req, res) => {
  const { name, type, area } = req.body;

  try {
    const newObject = await DistributionObject.create({ name, type, area });
    res.status(201).json(newObject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDistributionObjects,
  createDistributionObject,
};
