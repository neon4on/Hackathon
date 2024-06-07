const { Bill } = require('../models');
const { spawn } = require('child_process');
const path = require('path');

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.json(bills);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json(bill);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.distributeBills = async (req, res) => {
  try {
    const pythonProcess = spawn('python', [
      path.join(__dirname, '../machine_learning/distribute.py'),
    ]);

    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      try {
        const result = JSON.parse(output);
        res.json(result);
      } catch (error) {
        console.error('Error parsing output from Python script:', error);
        res.status(500).send('Error processing distribution');
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('stderr:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
