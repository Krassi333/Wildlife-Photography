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

async function editPost(id, data) {
    let post = await Post.findById(id).collation({ locale: 'en', strength: 2 });

    post.title = data.title;
    post.keyword = data.keyword;
    post.location = data.location;
    post.createdAt = data.createdAt;
    post.image = data.image;
    post.description = data.description;

    return post.save();
}

async function vote(id, user, voteRezult) {
    const post = await Post.findById(id);
    post.votes.push(user);

    if (voteRezult == 'up') {
        post.rating++;
    } else {
        post.rating--;
    }

    return post.save();

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


