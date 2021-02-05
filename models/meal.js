const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    meal: String,
    no_of_people: Number,
    restaurant: String,
    dish: [String],
    no_of_serve: [Number]
})

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;