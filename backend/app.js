const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const billRoutes = require('./routes/bill');
const distributionObjectRoutes = require('./routes/distributionObject');
const forecastRoutes = require('./routes/forecast');
const { exec } = require('child_process');
const path = require('path');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');
const app = express();
const { axios } = require('axios');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/bills', billRoutes);
app.use('/api/distribution-objects', distributionObjectRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);

app.get('/api/files', (req, res) => {
  const filesPath = path.join(__dirname, 'ml');
  fs.readdir(filesPath, (err, files) => {
    if (err) {
      return res.status(500).send('Не удалось получить список файлов');
    }
    res.json(files);
  });
});

// Маршрут для скачивания файла
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'ml', filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(500).send('Ошибка при скачивании файла.');
    }
  });
});
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
