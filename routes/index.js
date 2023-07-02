const router = require('express').Router();
// Import the API routes 
const apiRoutes = require('./api');

// adds "/api" prefix to all api routes 
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Incorrect route'));

module.exports = router;