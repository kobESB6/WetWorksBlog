const router = require('express').Router();
const { User } = require('../../models');

// Route for user signup
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided data
    const newUser = await User.create(req.body);

    // Save the session and log the user in
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      // Return the new user data as a JSON response
      res.status(200).json(newUser);
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    // Find the user by their username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save the session and log the user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Return success message and user data
      res.status(200).json({ userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session if the user is logged in
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
