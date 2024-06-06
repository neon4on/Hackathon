const express = require('express');
const router = express.Router();
const {
  getDistributionObjects,
  createDistributionObject,
} = require('../controllers/distributionObjectsController');

router.get('/', getDistributionObjects);
router.post('/', createDistributionObject);

module.exports = router;
