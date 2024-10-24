const router = require('express').Router();

// Importing route files from the Controllers directory
const homePageRoutes = require('./homeRte');  // Matches your structure
const apiEndpointRoutes = require('./api');   // Accessing the API folder
const dashboardPageRoutes = require('./dashBoardRte');  // Matches your structure

// Use home routes for the root ('/') path
router.use('/', homePageRoutes);

// Use API routes for '/api' path
router.use('/api', apiEndpointRoutes);

// Use dashboard routes for '/dashboard' path
router.use('/dashboard', dashboardPageRoutes);

module.exports = router;
