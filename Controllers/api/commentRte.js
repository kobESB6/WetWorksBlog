const router = require('express').Router();
const { Comment } = require('../../models');
const { apiGuard } = require('../../utils/authGuard');

// Route to handle creating a new comment
router.post('/', apiGuard, async (req, res) => {
  try {
    // Create a new comment using the request body and the logged-in user's ID
    const createdComment = await Comment.create({
      ...req.body,
      userId: req.session.user_id,
    });

    // Send the new comment back as a JSON response
    res.json(createdComment);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
