const { spawn } = require('child_process');
const path = require('path');

const forecastCosts = (req, res) => {
  const scriptPath = path.join(__dirname, '../machine_learning/predict.py');
  const pythonProcess = spawn('python', [scriptPath]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString();
    try {
      res.json(JSON.parse(result));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ message: 'Error during forecast calculation' });
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      res.status(500).json({ message: 'Error during forecast calculation' });
    }
  });

  const futureDates = JSON.stringify([
    { date: '2023-01-01' },
    { date: '2023-02-01' },
    { date: '2023-03-01' },
  ]);

  pythonProcess.stdin.write(futureDates);
  pythonProcess.stdin.end();
};

module.exports = {
  forecastCosts,
};
