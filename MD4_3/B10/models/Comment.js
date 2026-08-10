let comments = [];
let nextId = 1;

module.exports = {
    getAll: () => comments,
    create: (data) => {
        const newComment = { id: nextId++, ...data };
        comments.push(newComment);
        return newComment;
    },
    deleteByPostId: (postId) => {
        comments = comments.filter(c => c.postId !== parseInt(postId));
    }
};