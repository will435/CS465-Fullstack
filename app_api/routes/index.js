const express = require('express'); // Express app
const router = express.Router(); // Router logic

// Import the controllers
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList); // GET Method routes tripList

// Define route for a specific trip by code
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode); // GET Method routes tripsFindByCode

module.exports = router;