const express = require('express');
const router = express.Router();
const { forecastCosts } = require('../controllers/forecastController');

router.get('/', forecastCosts);

module.exports = router;
