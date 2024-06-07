const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.post('/process', (req, res) => {
  const pythonProcess = spawn('python3', ['ml/process.py']);

  pythonProcess.stdout.on('data', (data) => {
    const result = JSON.parse(data.toString());
    res.json(result);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;
