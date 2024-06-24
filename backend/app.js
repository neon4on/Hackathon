const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const billRoutes = require('./routes/bill');
const distributionObjectRoutes = require('./routes/distributionObject');
const forecastRoutes = require('./routes/forecast');
const authRoutes = require('./routes/auth');
const passwordResetRoutes = require('./routes/passwordReset');
const { spawn } = require('child_process');

const app = express();
const ML_FOLDER = path.join(__dirname, 'ml');

app.post('/api/run-distribution', (req, res) => {
  console.log('Получен запрос на запуск распределения');

  const pythonPath = 'python'; // или 'python3'
  const scriptPath = path.join(__dirname, 'ml', 'main.py');

  console.log(`Запуск Python скрипта: ${pythonPath} ${scriptPath}`);
  console.log(`Текущая директория: ${process.cwd()}`);
  console.log(`Содержимое ml папки:`);
  fs.readdirSync(path.join(__dirname, 'ml')).forEach((file) => {
    console.log(file);
  });

  const pythonProcess = spawn(pythonPath, [scriptPath], {
    cwd: path.join(__dirname, 'ml'),
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python скрипт вывод: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python скрипт ошибка: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python скрипт завершился с кодом ${code}`);
    if (code === 0) {
      res.json({ message: 'Распределение успешно запущено' });
    } else {
      res.status(500).json({ error: 'Ошибка при запуске распределения' });
    }
  });
});

if (!fs.existsSync(ML_FOLDER)) {
  console.error('Папка ml не существует!');
  fs.mkdirSync(ML_FOLDER);
  console.log('Папка ml создана.');
}

app.use(cors());
app.use(bodyParser.json());

app.use('/api/bills', billRoutes);
app.use('/api/distribution-objects', distributionObjectRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);

app.get('/api/files', (req, res) => {
  console.log('Получен запрос на /api/files');
  console.log('ML_FOLDER:', ML_FOLDER);

  fs.readdir(ML_FOLDER, (err, files) => {
    if (err) {
      console.error('Ошибка при чтении директории:', err);
      return res
        .status(500)
        .json({ error: 'Не удалось прочитать директорию', details: err.message });
    }

    console.log('Все файлы в директории:', files);

    const csvFiles = files.filter((file) => path.extname(file).toLowerCase() === '.csv');

    console.log('CSV файлы в директории:', csvFiles);

    const fileList = csvFiles.map((file) => {
      try {
        const stats = fs.statSync(path.join(ML_FOLDER, file));
        return {
          name: file,
          date: stats.mtime,
        };
      } catch (statErr) {
        console.error('Ошибка при получении информации о файле:', file, statErr);
        return {
          name: file,
          date: null,
          error: 'Не удалось получить информацию о файле',
        };
      }
    });

    console.log('Отправляемый список CSV файлов:', fileList);
    res.json(fileList);
  });
});

app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(ML_FOLDER, filename);

  if (path.extname(filename).toLowerCase() !== '.csv') {
    return res.status(400).json({ error: 'Можно скачивать только CSV файлы' });
  }

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Ошибка при скачивании файла:', err);
        res.status(500).send('Ошибка при скачивании файла.');
      }
    });
  } else {
    res.status(404).json({ error: 'Файл не найден' });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
