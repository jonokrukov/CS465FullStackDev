// Bring in the DB connection and Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');
const Meal = require('./meals.js');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));
var meals = JSON.parse(fs.readFileSync('./data/food_choices.json', 'utf8'));

// Delete any existings records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    await Meal.deleteMany({});
    await Meal.insertMany(meals);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});

