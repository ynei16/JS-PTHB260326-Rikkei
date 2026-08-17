const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://md4_6:123456database@miniproject.kw93ebr.mongodb.net/?appName=Miniproject');
    console.log('Kết nối MongoDB thành công!');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;