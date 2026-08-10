const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // Tái sử dụng middleware multer bài 9

router.get('/', postController.getAll);
router.post('/', postController.create);

// Bắt buộc đăng nhập VÀ phải là admin mới được xóa
router.delete('/:id', authenticate, authorize('admin'), postController.deletePost);

// Upload ảnh thumbnail
router.post('/:id/thumbnail', upload.single('thumbnail'), postController.uploadThumbnail);

module.exports = router;