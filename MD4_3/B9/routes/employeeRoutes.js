const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const upload = require('../middlewares/upload');

router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);

// Middleware xử lý lỗi riêng cho multer
const handleMulterUpload = (req, res, next) => {
    const uploadSingle = upload.single('avatar');
    uploadSingle(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return next(new AppError('File vượt quá 2MB', 400));
            }
            return next(err);
        }
        next();
    });
};

router.post('/:id/avatar', handleMulterUpload, employeeController.uploadAvatar);

module.exports = router;