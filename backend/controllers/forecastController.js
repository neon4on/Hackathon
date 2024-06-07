const { spawn } = require('child_process');
const path = require('path');

exports.getForecast = (req, res) => {
  const pythonProcess = spawn('python', [path.join(__dirname, '../machine_learning/predict.py')]);

  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (error) {
      console.error('Error parsing output from Python script:', error);
      res.status(500).send('Error processing forecast');
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('stderr:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
};
