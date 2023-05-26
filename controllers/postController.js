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

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Add Post'
    });
});

router.post('/create', async (req, res) => {
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        createdAt: req.body.createdAt,
        image: req.body.image,
        description: req.body.description,
        author: req.user._id,
    };
    console.log(data);

    try {
        await createPost(data);

        res.redirect('/post/catalog');
    } catch (err) {
        const errors = errorParser(err);

        res.render('create', {
            title: 'Add Page',
            data,
            errors
        });
    }
});

module.exports = router;