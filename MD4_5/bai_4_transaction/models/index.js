const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('md4_5_bai4', 'root', '', { host: '127.0.0.1', dialect: 'mysql', logging: false });

const Product = sequelize.define('Product', { name: DataTypes.STRING, stock: DataTypes.INTEGER });
const Order = sequelize.define('Order', { status: DataTypes.STRING });
const OrderItem = sequelize.define('OrderItem', { quantity: DataTypes.INTEGER }, { tableName: 'order_items' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'order_id' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id' });

module.exports = { sequelize, Product, Order, OrderItem };