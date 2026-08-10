const express = require('express');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Xử lý route không tồn tại (404 cho route)
app.all('*', (req, res, next) => {
    const AppError = require('./utils/AppError');
    next(new AppError(`Không tìm thấy route ${req.originalUrl}`, 404));
});

// Global Error Handler trả về format { success, message }
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Lỗi Server'
    });
});

const PORT = 3004;
app.listen(PORT, () => console.log(`Bài 10 Server đang chạy tại port ${PORT}`));