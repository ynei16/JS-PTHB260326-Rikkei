const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Order', {
    status: DataTypes.STRING
  }, { timestamps: true });
};