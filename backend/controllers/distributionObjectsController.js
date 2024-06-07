const { DistributionObject } = require('../models');

exports.getDistributionObjects = async (req, res) => {
  try {
    const objects = await DistributionObject.findAll();
    res.json(objects);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createDistributionObject = async (req, res) => {
  try {
    const object = await DistributionObject.create(req.body);
    res.json(object);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateDistributionObject = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await DistributionObject.findByPk(id);
    if (!object) {
      return res.status(404).send('Distribution object not found');
    }
    await object.update(req.body);
    res.json(object);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDistributionObject = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await DistributionObject.findByPk(id);
    if (!object) {
      return res.status(404).send('Distribution object not found');
    }
    await object.destroy();
    res.send('Distribution object deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
