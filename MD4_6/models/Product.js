const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tên sản phẩm là bắt buộc'],
    minLength: [5, 'Tên sản phẩm phải có tối thiểu 5 ký tự']
  },
  price: {
    type: Number,
    required: [true, 'Giá sản phẩm là bắt buộc'],
    min: [0, 'Giá sản phẩm không được là số âm']
  },
  category: {
    type: String,
    required: [true, 'Danh mục là bắt buộc']
  },
  stock: { 
    type: Number 
  } // Dành cho Bài 5
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);