const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: trips - list all the trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    } else {
      return res.status(200).json(trips);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error retrieving trips', error: err });
  }
};

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  const q = await Trip.findOne({ 'code': req.params.tripCode }).exec();
  if (!q) {
    return res.status(404).json({ message: 'Trip not found' });
  } else {
    return res.status(200).json(q);
  }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });
  
  try {
    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    const q = await Trip.findOneAndUpdate(
      { 'code': req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!q) {
      return res.status(404).json({ message: 'Trip not found' });
    } else {
      return res.status(200).json(q);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};