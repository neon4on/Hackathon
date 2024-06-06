const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DistributionObject = sequelize.define('DistributionObject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  // добавьте остальные поля
});

module.exports = DistributionObject;
