const { Bill } = require('../models');
const { spawn } = require('child_process');
const path = require('path');

const forecastCosts = async (req, res) => {
  try {
    const bills = await Bill.findAll();

    const data = bills.map((bill) => ({
      date: bill.date,
      amount: bill.amount,
    }));

    const scriptPath = path.join(__dirname, '../machine_learning/forecast.py');
    const pythonProcess = spawn('python', [scriptPath]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Error during forecast calculation' });
      }
      res.json(JSON.parse(result));
    });

    pythonProcess.stdin.write(JSON.stringify(data));
    pythonProcess.stdin.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  forecastCosts,
};
