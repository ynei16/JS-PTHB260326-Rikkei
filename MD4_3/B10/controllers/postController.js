const Post = require('../models/Post');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');

exports.getAll = (req, res, next) => {
    try { res.json({ success: true, data: Post.getAll() }); }
    catch (err) { next(err); }
};

exports.create = (req, res, next) => {
    try {
        const post = Post.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (err) { next(err); }
};

exports.deletePost = (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = Post.findById(postId);
        if (!post) throw new AppError('Post không tồn tại', 404);

        Post.deleteById(postId);
        // Cascade delete: xóa bài viết thì xóa luôn comment liên quan
        Comment.deleteByPostId(postId);

        res.json({ success: true, message: "Đã xóa bài viết và comment liên quan" });
    } catch (err) { next(err); }
};

exports.uploadThumbnail = (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!Post.findById(postId)) throw new AppError('Post không tồn tại', 404);
        if (!req.file) throw new AppError('Chưa upload file', 400);

        Post.updateThumbnail(postId, req.file.path);
        res.json({ success: true, message: "Upload thumbnail thành công" });
    } catch (err) { next(err); }
};