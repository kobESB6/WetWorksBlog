

const router = require('express').Router();
const homeRoutes = require('./homeRte');
const dashBoardRoutes = require('./dashBoardRte');
const apiRoutes = require('./api');

// Use routes
router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
