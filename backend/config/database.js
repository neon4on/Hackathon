const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('billing_db', 'postgres', '1488', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
