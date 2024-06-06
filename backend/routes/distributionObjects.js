const express = require('express');
const router = express.Router();
const {
  getDistributionObjects,
  createDistributionObject,
  updateDistributionObject,
  deleteDistributionObject,
} = require('../controllers/distributionObjectsController');

router.get('/', getDistributionObjects);
router.post('/', createDistributionObject);
router.put('/:id', updateDistributionObject);
router.delete('/:id', deleteDistributionObject);

module.exports = router;
