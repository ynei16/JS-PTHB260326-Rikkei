const { sequelize, Order, OrderItem, Product } = require('../models');

const createOrder = async (req, res) => {
  const { items } = req.body;
  const t = await sequelize.transaction();

  try {
    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t, lock: true });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.qty) {
        throw new Error(`Insufficient_Stock_${product.name}`);
      }
    }

    const order = await Order.create({ status: 'pending' }, { transaction: t });

    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.qty
      }, { transaction: t });

      await Product.decrement('stock', {
        by: item.qty,
        where: { id: item.productId },
        transaction: t
      });
    }

    await t.commit();
    return res.json({ success: true, message: 'Đặt hàng thành công' });

  } catch (error) {
    await t.rollback();
    if (error.message.includes('Insufficient_Stock_')) {
      const pName = error.message.split('Insufficient_Stock_')[1];
      return res.status(409).json({ success: false, message: `Thiếu hàng: ${pName}` });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder };