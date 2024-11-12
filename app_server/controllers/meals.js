var fs = require('fs');
var food_choices = JSON.parse(fs.readFileSync('./data/food_choices.json', 'utf8'));

// Get Meals view
const meals = (req, res) => {
    res.render('meals', {title: 'Travlr Meals', food_choices});
};

module.exports = {
    meals
};