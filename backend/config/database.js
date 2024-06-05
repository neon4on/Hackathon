const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('billing_db', 'name', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
