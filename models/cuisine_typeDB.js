"use strict"

var db = require('../db-connection');
const Cuisine_type = require('./cuisine_type');

class Cuisine_typeDB {

    addCuisine_type(request, respond) {
        var cuisine_typeObject = new Cuisine_type(null, request.body.cuisine_type);
        var sql = "INSERT INTO aerofoodDB.cuisine_type (cuisine_type) VALUES (?)";
        var values = [cuisine_typeObject.getCuisine_type()]

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    filterCuisine (request, respond) {
        var cuisine_type_id = request.params.cuisine_type_id;
        var sql = "SELECT cuisine_type.cuisine_type_id, cuisine_type.cuisine_type, restaurant_info.restaurant_name, restaurant_info.restaurant_id, restaurant_info.restaurant_coverimg, cast(avg(review_info.review_rating) as decimal(2, 1)) avg_review_ratings FROM ( ( ( cuisine_type LEFT JOIN restaurant_cuisine ON restaurant_cuisine.cuisine_id = cuisine_type.cuisine_type_id ) LEFT JOIN restaurant_info ON restaurant_cuisine.restaurantid = restaurant_info.restaurant_id ) LEFT JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) WHERE cuisine_type.cuisine_type LIKE ? GROUP BY restaurant_info.restaurant_id "

        db.query(sql, cuisine_type_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteCuisine_type(request, respond) {
        var cuisine_type_id = request.params.cuisine_type_id;
        var sql = "DELETE FROM aerofooddb.cuisine_type WHERE cuisine_type_id = ?";

        db.query(sql, cuisine_type_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = Cuisine_typeDB