const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DistributionObject = sequelize.define('DistributionObject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = DistributionObject;
