const router = require('express').Router();
const { Post } = require('../../models');
const { apiGuard } = require('../../utils/authGuard');

// Route to create a new post
router.post('/', apiGuard, async (req, res) => {
  const postData = req.body;

  try {
    // Create a new post with the provided data and associate it with the logged-in user
    const createdPost = await Post.create({ 
      ...postData, 
      userId: req.session.user_id 
    });

    // Send the newly created post back as a JSON response
    res.json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to update an existing post by its ID
router.put('/:id', apiGuard, async (req, res) => {
  try {
    // Update the post with the data provided in req.body based on the post ID
    const [updatedRowsCount] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Check if any rows were affected, meaning the update was successful
    if (updatedRowsCount > 0) {
      res.status(200).end();
    } else {
      res.status(404).end(); // No post was found with the given ID
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Route to delete an existing post by its ID
router.delete('/:id', apiGuard, async (req, res) => {
  try {
    // Delete the post by its ID
    const deletedRowsCount = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Check if any rows were affected, meaning the deletion was successful
    if (deletedRowsCount > 0) {
      res.status(200).end();
    } else {
      res.status(404).end(); // No post was found with the given ID
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
