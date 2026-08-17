const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('md4_5_bai5', 'root', '', { host: '127.0.0.1', dialect: 'mysql' });

const Category = sequelize.define('Category', { name: DataTypes.STRING });
const Product = sequelize.define('Product', { name: DataTypes.STRING });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { sequelize, Category, Product };