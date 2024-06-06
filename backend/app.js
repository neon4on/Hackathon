const express = require('express');
const cors = require('cors');
const { initDb } = require('./models');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const billsRouter = require('./routes/bills');
const distributeRouter = require('./routes/distribute');
const forecastRouter = require('./routes/forecast');
const distributionObjectsRouter = require('./routes/distributionObjects');

app.use('/api/bills', billsRouter);
app.use('/api/distribute', distributeRouter);
app.use('/api/forecast', forecastRouter);
app.use('/api/distribution-objects', distributionObjectsRouter);

initDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
