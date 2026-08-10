const express = require('express');
const AppError = require('./utils/AppError');

const app = express();
app.use(express.json());

// Tuyến 1: Kiểm tra params
app.get('/users/:id', (req, res, next) => {
    const userId = req.params.id;
    // Giả sử id = 1 là tồn tại, còn lại là không
    if (userId !== '1') {
        return next(new AppError('Không tìm thấy user', 404));
    }
    res.json({ message: "User tồn tại" });
});

// Tuyến 2: Kiểm tra body
app.post('/users', (req, res, next) => {
    if (!req.body.email) {
        return next(new AppError('Thiếu trường email', 400));
    }
    res.status(201).json({ message: "Tạo user thành công" });
});

// Tuyến 3: Kiểm tra header
app.get('/users/secret', (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new AppError('Chưa xác thực', 401));
    }
    res.json({ message: "Dữ liệu tuyệt mật" });
});

// Global Error Handling Middleware (luôn đặt cuối cùng)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Lỗi hệ thống'
    });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Bài 8 Server đang chạy tại port ${PORT}`));