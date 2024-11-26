const mongoose = require('mongoose');

// Define the meal schema
const mealSchema = new mongoose.Schema({
    code : { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

const Meal = mongoose.model('meals', mealSchema);
module.exports = Meal;