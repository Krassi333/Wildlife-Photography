const Post = require('../models/Post');
const User = require('../models/User');


async function getAllPosts() {
    return Post.find({}).collation({ locale: 'en', strength: 2 }).lean();
}

async function createPost(data) {
    return Post.create(data);
};

async function getById(id) {
    return Post.findById(id).collation({ locale: 'en', strength: 2 }).lean();
}

async function getPostAuthor(_id) {
    return User.findOne({ _id });
}

async function deletePost(id) {
    return Post.findByIdAndDelete(id);
};

module.exports = {
    getAllPosts,
    createPost,
    getById,
    getPostAuthor,
    deletePost,
    editPost,
    vote
}


