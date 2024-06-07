const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Импортируем пакет cors
const billRoutes = require('./routes/bill');
const distributionObjectRoutes = require('./routes/distributionObject');
const forecastRoutes = require('./routes/forecast');
const mlRoutes = require('./routes/ml'); // Импортируем маршруты для ML
const { exec } = require('child_process');
const path = require('path');

const app = express();

app.use(cors()); // Используем cors
app.use(bodyParser.json());

app.use('/api/bills', billRoutes);
app.use('/api/distribution-objects', distributionObjectRoutes);
app.use('/api/forecast', forecastRoutes);
// app.use('/api/ml', mlRoutes); // Добавляем маршруты для ML

app.post('/api/ml', (req, res) => {
  const scriptPath = path.join(__dirname, 'ml', 'process.py');
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ error: 'Error executing script' });
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      return res.status(500).json({ error: 'Script error' });
    }
    res.json(JSON.parse(stdout));
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
