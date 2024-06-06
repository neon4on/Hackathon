const { DistributionObject } = require('../models');

const getDistributionObjects = async (req, res) => {
  try {
    const objects = await DistributionObject.findAll();
    res.json(objects);
  } catch (error) {
    console.error('Error fetching distribution objects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createDistributionObject = async (req, res) => {
  try {
    const object = await DistributionObject.create(req.body);
    res.status(201).json(object);
  } catch (error) {
    console.error('Error creating distribution object:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateDistributionObject = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await DistributionObject.update(req.body, { where: { id } });
    if (updated) {
      const updatedObject = await DistributionObject.findOne({ where: { id } });
      res.json(updatedObject);
    } else {
      res.status(404).json({ message: 'Distribution object not found' });
    }
  } catch (error) {
    console.error('Error updating distribution object:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteDistributionObject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DistributionObject.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Distribution object not found' });
    }
  } catch (error) {
    console.error('Error deleting distribution object:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getDistributionObjects,
  createDistributionObject,
  updateDistributionObject,
  deleteDistributionObject,
};
