const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register the model

// GET: trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec(); // No filter, return all records

    if (!trips || trips.length === 0) {
      // Database returned no data
      return res.status(404).json({
        message: 'No trips found'
      });
    } else {
      // Return resulting trip list
      return res.status(200).json(trips);
    }
  } catch (err) {
    // Handle any errors that occur
    return res.status(500).json({
      message: 'Error retrieving trips',
      error: err
    });
  }
};

// GET : /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Trip.findOne({ 'code': req.params.tripCode }).exec(); // Return single record
  
    // Uncomment the following line to show results of query
    // console.log(q);
  
    if (!q) { // Database returned no data
      return res
        .status(404)
        .json({ message: 'Trip not found' });
    } else { // Return resulting trip
      return res
        .status(200)
        .json(q);
    }
  };

module.exports = {
    tripsList, 
    tripsFindByCode 
};