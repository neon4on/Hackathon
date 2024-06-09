const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'billing_db',
  password: '3214',
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
