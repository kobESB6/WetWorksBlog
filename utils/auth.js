// Middleware to protect routes that require authentication (e.g., dashboard)
const requireAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      // Redirect to login page if the user is not authenticated
      res.redirect('/login');
    } else {
      // If authenticated, proceed to the next middleware or route handler
      next();
    }
  };
  
  // Middleware to protect API routes that require authentication
  const requireApiAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      // Send a 403 error if the user is not authenticated
      res.status(403).json({ msg: 'You must be logged in to perform this action.' });
    } else {
      // If authenticated, proceed to the next middleware or API handler
      next();
    }
  };
  
  // Middleware to protect routes that should be accessible only when the user is not logged in
  const restrictIfAuthenticated = (req, res, next) => {
    if (!req.session.logged_in) {
      // If the user is not logged in, allow access
      next();
    } else {
      // If the user is logged in, redirect to the homepage
      res.redirect('/');
    }
  };
  
  // Exporting the authentication middleware functions for use in routes
  module.exports = {
    requireAuth,
    requireApiAuth,
    restrictIfAuthenticated,
  };
  