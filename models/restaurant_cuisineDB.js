"use strict"

var db = require('../db-connection');
const Restaurant_cuisine = require('./restaurant_cuisine');

class Restaurant_cuisineDB {

    addCuisine(request, respond) {
        var cuisineObject = new Restaurant_cuisine(null, request.body.cuisine_id, request.body.restaurantid);
        var sql = "INSERT INTO aerofoodDB.restaurant_cuisine (cuisine_id, restaurantid) VALUES(?,?)";
        var values = [cuisineObject.getCuisine_id(), cuisineObject.getRestaurant_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateCuisine(request, respond) {
        var cuisineObject = new Restaurant_cuisine(request.params.restaurant_cuisine_id, request.body.cuisine_id, request.body.restaurantid);
        var sql = "UPDATE restaurant_cuisine SET cuisine_id = ?, restaurantid = ? WHERE restaurant_cuisine_id = ?";
        var values = [cuisineObject.getCuisine_id(), cuisineObject.getRestaurant_id(),cuisineObject.getRestaurant_cuisine_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteCuisine(request, respond) {
        var restaurant_cuisine_id = request.params.restaurant_cuisine_id;
        var sql = "DELETE FROM restaurant_cuisine WHERE restaurant_cuisine_id = ?"

        db.query(sql, restaurant_cuisine_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = Restaurant_cuisineDB