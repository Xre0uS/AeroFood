"use strict"

const restaurantdb = require('../models/restaurantsDB');

var restaurantsDBObject = new restaurantdb();

function routeRestaurants(app) {
    app.route('/restaurants')
        .get(restaurantsDBObject.getAllRestaurants)
        .post(restaurantsDBObject.addRestaurant);
    app.route('/restaurants/:restaurant_id')
        .delete(restaurantsDBObject.deleteRestaurant)
        .put(restaurantsDBObject.updateRestaurant);
    app.route('/restaurants/reviews/:restaurant_id')
        .get(restaurantsDBObject.getRestaurantReviews);
    app.route('/restaurants/images')
        .get(restaurantsDBObject.getAllRestaurantImage);
    app.route('/restaurants/images/:restaurant_id')
        .get(restaurantsDBObject.getRestaurantImage);
    app.route('/restaurants/search/:restaurant_name')
        .get(restaurantsDBObject.searchRestaurant);
    app.route('/restaurants/info/:restaurant_id')
        .get(restaurantsDBObject.getRestaruantInfo)
    app.route('/restaurants/details/:restaurant_id')
        .get(restaurantsDBObject.getRestaurantDetails);

}
module.exports = { routeRestaurants };