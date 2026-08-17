const connectDB = require('./db');
const Store = require('./models/Store');
const mongoose = require('mongoose');

const run = async () => {
  await connectDB();
  
  console.log('\n--- ĐANG TẠO MỚI CỬA HÀNG ---');
  try {
    const newStore = new Store({
      name: 'Cửa hàng Tiện lợi 24/7',
      location: {
        street: '123 Đường Nguyễn Huệ',
        district: 'Quận 1',
        city: 'Hồ Chí Minh'
      }
    });

    const savedStore = await newStore.save();
    console.log('=> Tạo thành công! Cấu trúc JSON trả về thể hiện rõ quan hệ cha-con:');
    console.log(savedStore);
  } catch (error) {
    console.error('Lỗi khi tạo cửa hàng:', error.message);
  }
  
  await mongoose.disconnect();
  console.log('Đã đóng kết nối MongoDB.');
};

run();