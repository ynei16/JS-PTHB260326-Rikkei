let posts = [];
let nextId = 1;

module.exports = {
    getAll: () => posts,
    findById: (id) => posts.find(p => p.id === parseInt(id)),
    create: (data) => {
        const newPost = { id: nextId++, thumbnailUrl: null, ...data };
        posts.push(newPost);
        return newPost;
    },
    deleteById: (id) => {
        posts = posts.filter(p => p.id !== parseInt(id));
    },
    updateThumbnail: (id, url) => {
        const post = posts.find(p => p.id === parseInt(id));
        if (post) post.thumbnailUrl = url;
    }
};