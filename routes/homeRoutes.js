const api = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts route
api.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User}],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get post by PK
api.get('/post/:id', async ( req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        const post = postData.get({ plain: true });

        // Confirm post belongs to user
        let match = false;
        if (req.session.user_id == post.user_id) {
            match = true;
        }
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
            match
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth middleware to prevent access to route
api.get('/dashboard', withAuth, async ( req, res) => {
    try {
        // find user based on session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post },],
        });

        const user = userData.get({ plain: true});

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// if User is already logged in
api.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login');
});

//Export
module.exports = api;