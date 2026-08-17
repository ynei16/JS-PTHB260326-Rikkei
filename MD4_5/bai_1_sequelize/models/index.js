const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('md4_5_bai1', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});
const Product = require('./product')(sequelize);
module.exports = { sequelize, Product };