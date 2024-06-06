const express = require('express');
const router = express.Router();
const { distributeBills } = require('../controllers/distributionController');

router.post('/', distributeBills);

module.exports = router;
