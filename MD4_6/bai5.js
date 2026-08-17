const connectDB = require('./db');
const Product = require('./models/Product');
const mongoose = require('mongoose');

const run = async () => {
  await connectDB();
  
  try {
    // 1. Nạp dữ liệu giả lập (Sản phẩm cũ chưa khai báo stock)
    await Product.create({ name: 'Laptop Dell Cũ', price: 10000, category: 'Laptop' });
    await Product.create({ name: 'iPhone 12 Pro Cũ', price: 15000, category: 'Mobile' });

    // 2. Kiểm tra trước khi cập nhật
    console.log('\n[1] TRƯỚC KHI CHẠY SCRIPT :');
    // Tìm các document không có trường stock
    const beforeUpdate = await Product.find({ stock: { $exists: false } }).select('-__v'); 
    console.log(beforeUpdate);

    // 3. Chạy lệnh updateMany để bổ sung field
    await Product.updateMany(
      { stock: { $exists: false } }, 
      { $set: { stock: 10 } }
    );

    // 4. Kiểm tra lại sau khi cập nhật
    console.log('\n[2] SAU KHI CHẠY SCRIPT (Tất cả sản phẩm cũ đã được bổ sung "stock: 10"):');
    // Tìm các document có stock bằng 10
    const afterUpdate = await Product.find({ stock: 10 }).select('-__v');
    console.log(afterUpdate);

  } catch (error) {
    console.error('Lỗi:', error.message);
  }
  
  await mongoose.disconnect();
};

run();