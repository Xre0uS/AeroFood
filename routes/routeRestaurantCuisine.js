"use strict"

const restaurantCuisineDB = require('../models/restaurant_cuisineDB');

var restaurantcuisineDBObject = new restaurantCuisineDB();

function routeRestaurantCuisine(app) {
    app.route('/restaurantcuisine')
        .post(restaurantcuisineDBObject.addCuisine);
    app.route('/restaurantcuisine/:restaurant_cuisine_id')
        .delete(restaurantcuisineDBObject.deleteCuisine)
        .put(restaurantcuisineDBObject.updateCuisine);
}
module.exports = { routeRestaurantCuisine }