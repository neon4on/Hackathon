const express = require('express');
const { exec } = require('child_process');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
  const scriptPath = path.join(__dirname, '../ml/process.py');

  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ error: 'Failed to execute script' });
    }
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      return res.status(500).json({ error: 'Script error' });
    }

    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: 'Failed to parse script output' });
    }
  });
});

module.exports = router;
