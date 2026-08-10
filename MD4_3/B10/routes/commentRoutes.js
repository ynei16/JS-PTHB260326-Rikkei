const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate } = require('../middlewares/auth');

// Bắt buộc đăng nhập mới được bình luận
router.post('/', authenticate, commentController.createComment);

module.exports = router;