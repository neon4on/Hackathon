const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Bill = sequelize.define('Bill', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

const DistributionObject = sequelize.define('DistributionObject', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  area: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = {
  Bill,
  DistributionObject,
};
