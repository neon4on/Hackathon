const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Импорт маршрутов
const billsRoute = require('./routes/bills');
const distributeRoute = require('./routes/distribute');
const forecastRoute = require('./routes/forecast');
const distributionObjectsRoute = require('./routes/distributionObjects');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Использование маршрутов
app.use('/api/bills', billsRoute);
app.use('/api/distribute', distributeRoute);
app.use('/api/forecast', forecastRoute);
app.use('/api/distribution-objects', distributionObjectsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
