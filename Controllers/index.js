
const router = require('express').Router();

// Importing routes
const homePageRoutes = require('./homeRte');  // Corrected based on your structure
const apiEndpointRoutes = require('./api');
const dashboardPageRoutes = require('./dashBoardRte');  // Corrected based on your structure

// Use home routes for the root ('/') path
router.use('/', homePageRoutes);

// Use API routes for '/api' path
router.use('/api', apiEndpointRoutes);

// Use dashboard routes for '/dashboard' path
router.use('/dashboard', dashboardPageRoutes);

module.exports = router;
