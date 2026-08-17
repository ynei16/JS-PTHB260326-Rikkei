const { Op } = require('sequelize');
const { Product } = require('../models');

const getProducts = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const keyword = req.query.keyword || '';
    const sort = req.query.sort || 'id_desc';

    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;
    if (limit > 50) limit = 50;

    const offset = (page - 1) * limit;
    const whereCondition = keyword ? { name: { [Op.like]: `%${keyword}%` } } : {};
    
    let orderCondition = [['id', 'DESC']];
    if (sort === 'price_asc') orderCondition = [['price', 'ASC']];
    if (sort === 'price_desc') orderCondition = [['price', 'DESC']];

    const { count, rows } = await Product.findAndCountAll({
      where: whereCondition, order: orderCondition, limit, offset
    });

    return res.json({
      success: true, data: rows,
      meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { getProducts };