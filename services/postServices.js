const Post = require('../models/Post');
const User = require('../models/User');
async function getAllPosts() {
    return Post.find({}).collation({ locale: 'en', strength: 2 }).lean();
}
module.exports = {
    getAllPosts,
    createPost,
    getById,
    getPostAuthor,
    deletePost,
    editPost,
    vote
}


