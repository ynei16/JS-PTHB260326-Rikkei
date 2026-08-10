class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Đánh dấu đây là lỗi lường trước được
        
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;