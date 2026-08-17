const connectDB = require('./db');
const Product = require('./models/Product');
const mongoose = require('mongoose');

const run = async () => {
  await connectDB();
  
  // Tạo dữ liệu mẫu trước khi query
  await Product.create([
    { name: 'MacBook Air', price: 18000, category: 'Laptop' },
    { name: 'iPhone 15', price: 15000, category: 'Mobile' },
    { name: 'Tivi Sony', price: 19000, category: 'Tivi' }, // Khác category
    { name: 'Laptop Gaming', price: 30000, category: 'Laptop' } // Giá > 20000
  ]);

  const products = await Product.find({
    category: { $in: ["Laptop", "Mobile"] },
    price: { $lt: 20000 }
  });
  
  console.log('=> Danh sách Sản phẩm (Laptop / Mobile) có giá < 20.000:');
  console.log(products);
  
  await mongoose.disconnect();
};
run();