const { Pool } = require('pg');

const pool = new Pool({
  user: 'hackathon',
  host: '176.123.162.244',
  database: 'billing_db',
  password: 'hackathon11Task',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Connection to the database failed:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

module.exports = pool;
