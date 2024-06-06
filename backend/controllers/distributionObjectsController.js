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

const updateDistributionObject = async (req, res) => {
  const { id } = req.params;
  const { name, type, area } = req.body;

  try {
    const object = await DistributionObject.findByPk(id);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    object.name = name;
    object.type = type;
    object.area = area;
    await object.save();

    res.json(object);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDistributionObject = async (req, res) => {
  const { id } = req.params;

  try {
    const object = await DistributionObject.findByPk(id);
    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    await object.destroy();
    res.status(204).json({ message: 'Object deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDistributionObjects,
  createDistributionObject,
  updateDistributionObject,
  deleteDistributionObject,
};
