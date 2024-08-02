// Bring in the DB connection and the Trip schema
const mongoose = require('./db');
const Trip = require('./travlr'); // Ensure the correct path to your model

// Read seed data from JSON file
const fs = require('fs');
const path = require('path');
const trips = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'trips.json'), 'utf8'));

// Seed the database
const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Data successfully seeded');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
  await mongoose.connection.close();
  process.exit(0);
});