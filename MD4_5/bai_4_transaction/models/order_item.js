const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OrderItem', {
    quantity: DataTypes.INTEGER
  }, { 
    tableName: 'order_items',
    timestamps: true 
  });
};