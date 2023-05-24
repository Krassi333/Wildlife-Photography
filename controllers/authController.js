router.post('/register', async (req, res) => {
    //console.log(req.body);

    try {
        if (req.body.password != req.body.rePass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body);
        res.cookie('token', token);
        res.redirect('/')
    } catch (err) {

        const errors = errorParser(err);

        res.render('register', {
            title: 'Register Page',
            errors
        })
    }
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
});

router.post('/login', async (req, res) => {
    try {

        const token = await login(req.body.email, req.body.password,req);
        
        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        const errors = errorParser(err);
        res.render('login', {
            title: 'Login Page',
            errors
        })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

