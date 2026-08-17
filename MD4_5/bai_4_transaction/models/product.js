const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, { timestamps: true });
};