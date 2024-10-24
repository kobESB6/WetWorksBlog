const router = require('express').Router();
const { Post } = require('../models');
const { withGuard } = require('../utils/authGuard');

// Route to render the dashboard with all posts created by the logged-in user
router.get('/', withGuard, async (req, res) => {
  try {
    // Fetch all posts created by the logged-in user
    const userPostsData = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    // Serialize the data to be used in Handlebars template
    const userPosts = userPostsData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the user's posts
    res.render('dashboard', {
      isDashboard: true,       // Flag to indicate we're in the dashboard
      posts: userPosts,        // Pass the posts data to the view
      isLoggedIn: req.session.logged_in,  // Pass the login status
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to render the form for creating a new post
router.get('/new', withGuard, (req, res) => {
  // Render the new post form page
  res.render('newPost', {
    isDashboard: true,
    isLoggedIn: req.session.logged_in,
  });
});

// Route to render the form for editing an existing post
router.get('/edit/:id', withGuard, async (req, res) => {
  try {
    // Fetch the post to be edited based on its ID
    const singlePostData = await Post.findByPk(req.params.id);

    // If the post exists, render the edit form with the post's data
    if (singlePostData) {
      const post = singlePostData.get({ plain: true });

      res.render('editPost', {
        isDashboard: true,
        post,                   // Pass the post data to the view
        isLoggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
