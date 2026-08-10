const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());

// Middleware logger toàn cục
app.use((req, res, next) => {
    console.log(`[LOGGER] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/employees', employeeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Bài 9 Server đang chạy tại port ${PORT}`));