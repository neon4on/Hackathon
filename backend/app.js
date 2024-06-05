const express = require('express');
const cors = require('cors');
const { initDb } = require('./models');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const billsRouter = require('./routes/bills');
const distributeRouter = require('./routes/distribute');

app.use('/api/bills', billsRouter);
app.use('/api/distribute', distributeRouter);

initDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
