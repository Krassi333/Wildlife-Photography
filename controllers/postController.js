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

router.get('/:id/details', async (req, res) => {
    const post = await getById(req.params.id);
    const user = req.cookies.token;

    const author = await getPostAuthor(post.author);
    post.authorName = `${author.firstName} ${author.lastName}`;

    if (post.votes.length > 0) {

        let voteUsers = [];

        for (let el of post.votes) {
            const email = await getUserEmail(el);
            voteUsers.push(email);
        }
        
        post.listOfVoteUser = voteUsers.join(', ');

        if (post.votes.map(v => v.toString()).includes(req.user._id.toString())) {
            post.alreadyVote = true;
        }  
    }


    if (user) {
        post.hasUser = true;

        if (req.user._id.toString() == post.author.toString()) {
            post.isAuthor = true;
        }
    }

    res.render('details', {
        title: 'Details Page',
        post,
        user
    })
});

module.exports = router;