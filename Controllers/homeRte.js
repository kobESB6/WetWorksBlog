const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const { withGuard, withoutGuard } = require('../utils/authGuard');

// Route to display the homepage with all posts
router.get('/', async (req, res) => {
  try {
    // Fetch all posts with associated user data
    const allPostsData = await Post.findAll({
      include: [User],
    });

    // Serialize the data to be used in Handlebars
    const allPosts = allPostsData.map((post) => post.get({ plain: true }));

    // Render the homepage with all posts
    res.render('home', { 
      posts: allPosts, 
      isLoggedIn: req.session.logged_in 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to display a single post by ID with comments and user data
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the post by its ID, including associated user and comments
    const singlePostData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User], // Include the user who wrote each comment
        },
      ],
    });

    // If post exists, render it; otherwise, send 404
    if (singlePostData) {
      const post = singlePostData.get({ plain: true });

      res.render('post', { 
        post, 
        isLoggedIn: req.session.logged_in 
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to display the login page (only if the user is not logged in)
router.get('/login', withoutGuard, (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to display the signup page (only if the user is not logged in)
router.get('/signup', withoutGuard, (req, res) => {
  try {
    res.render('signup');
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
