const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  quantity: Number,
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);