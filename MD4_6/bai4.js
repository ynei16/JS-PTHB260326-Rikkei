const connectDB = require('./db');
const Product = require('./models/Product');
const Order = require('./models/Order');
const mongoose = require('mongoose');

const run = async () => {
  await connectDB();
  
  try {
    console.log('\n--- ĐANG TẠO DỮ LIỆU MẪU ---');
    // 1. Tạo một sản phẩm mẫu để lấy ID tham chiếu
    const product = new Product({ 
      name: 'iPhone 15 Pro Max', 
      price: 30000, 
      category: 'Mobile' 
    });
    const savedProduct = await product.save();
    console.log('=> Đã tạo Sản phẩm:', savedProduct.name);

    // 2. Tạo đơn hàng tham chiếu tới ID của sản phẩm trên
    const order = new Order({
      orderNumber: 'ORD-2023-001',
      quantity: 2,
      product_id: savedProduct._id
    });
    const savedOrder = await order.save();
    console.log('=> Đã tạo Đơn hàng:', savedOrder.orderNumber);

    // 3. Query KHÔNG dùng populate (Chỉ thấy mã ID)
    console.log('\n--- [1] KẾT QUẢ KHI KHÔNG DÙNG POPULATE ---');
    const rawOrder = await Order.findById(savedOrder._id);
    console.log(rawOrder);

    // 4. Query CÓ dùng populate (Thấy nguyên object Sản phẩm)
    console.log('\n--- [2] KẾT QUẢ SAU KHI DÙNG POPULATE ---');
    const populatedOrder = await Order.findById(savedOrder._id).populate('product_id');
    console.log(populatedOrder);

  } catch (error) {
    console.error('Lỗi:', error.message);
  }
  
  await mongoose.disconnect();
};

run();