const connectDB = require('./db');
const Product = require('./models/Product');
const mongoose = require('mongoose');

const run = async () => {
  await connectDB();
  
  console.log('\n--- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---');
  try {
    const validProduct = new Product({ name: 'Laptop Dell XPS 13', price: 25000, category: 'Laptop' });
    const saved = await validProduct.save();
    console.log('=> LƯU THÀNH CÔNG sản phẩm hợp lệ:\n ID:', saved._id);
  } catch (err) { console.log(err.message); }

  console.log('\n--- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---');
  try {
    console.log('=> Đang cố gắng lưu sản phẩm lỗi vào DB...');
    const invalidProduct = new Product({ name: 'Lỗi', price: -5000, category: 'Laptop' });
    await invalidProduct.save();
  } catch (err) {
    console.log('[!] BẮT ĐƯỢC LỖI VALIDATION:');
    if (err.errors.name) console.log(` - Lỗi ở trường 'name': ${err.errors.name.message}`);
    if (err.errors.price) console.log(` - Lỗi ở trường 'price': ${err.errors.price.message}`);
  }
  
  await mongoose.disconnect();
  console.log('\nĐã đóng kết nối MongoDB.');
};
run();