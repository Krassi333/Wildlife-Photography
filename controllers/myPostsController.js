const { getAllMyPosts, getUserName } = require('../services/userServices');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const posts = await getAllMyPosts(req.user._id);

    if (posts.length == 0) {
        posts.noPosts = true;
    } else {
        fullName = await getUserName(req.user._id);
        posts.map(v => v.fullName = fullName);
    }

    res.render('my-posts', {
        title: 'My Posts',
        posts
    })

})

module.exports = router;