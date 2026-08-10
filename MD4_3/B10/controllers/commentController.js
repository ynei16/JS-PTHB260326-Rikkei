const Comment = require('../models/Comment');
const Post = require('../models/Post');
const AppError = require('../utils/AppError');

exports.createComment = (req, res, next) => {
    try {
        const { postId, content } = req.body;
        
        // Validate xem bài post có tồn tại không
        const post = Post.findById(postId);
        if (!post) {
            throw new AppError('Bài viết không tồn tại để bình luận', 404);
        }

        const newComment = Comment.create({ postId, content });
        res.status(201).json({ success: true, data: newComment });
    } catch (err) { next(err); }
};