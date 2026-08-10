const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json()); // Xử lý body dạng JSON

app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Bài 6 Server đang chạy tại port ${PORT}`));