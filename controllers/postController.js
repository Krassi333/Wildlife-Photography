const { getAllPosts, createPost, getById, getPostAuthor, deletePost, editPost, vote } = require('../services/postServices');
const { getUserEmail } = require('../services/userServices');
const errorParser = require('../util/errorParser');

const router = require('express').Router();

router.get('/catalog', async (req, res) => {
    const posts = await getAllPosts();
    res.render('catalog', {
        title: 'All Posts',
        posts
    });
});

module.exports = router;