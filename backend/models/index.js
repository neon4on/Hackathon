const sequelize = require('../config/database');
const Bill = require('./bill');
const DistributionObject = require('./distributionObject');

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = { Bill, DistributionObject, initDb };
