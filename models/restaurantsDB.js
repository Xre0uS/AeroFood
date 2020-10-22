"use strict"

var db = require('../db-connection');
const Restaurant = require('./restaurants');

class RestaurantsDB {

    getAllRestaurants(request, respond) {
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_info.restaurant_coverimg, cast(avg(review_info.review_rating) as decimal(2, 1)) avg_review_ratings, cuisine_type.cuisine_type FROM ( ( ( restaurant_info LEFT JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) LEFT JOIN restaurant_cuisine ON restaurant_cuisine.restaurantid = restaurant_info.restaurant_id ) LEFT JOIN cuisine_type ON cuisine_type.cuisine_type_id = restaurant_cuisine.cuisine_id ) GROUP BY restaurant_info.restaurant_id ";

        db.query(sql, function (error, result) {
            if (error) {
                throw error
            }
            else {
                respond.json(result);
            }
        });
    }

    addRestaurant(request, respond) {
        var restaurantObject = new Restaurant(null, request.body.restaurant_name, request.body.restaurant_number, request.body.restaurant_address, request.body.restaurant_hours_open, request.body.restaurant_hours_close, request.body.restaurant_description, request.body.restaurant_coverimg);
        var sql = "INSERT INTO aerofoodDB.restaurant_info (restaurant_name, restaurant_number, restaurant_address, restaurant_hours_open, restaurant_hours_close, restaurant_description, restaurant_coverimg) VALUES(?,?,?,?,?,?,?)";
        var values = [restaurantObject.getRestaurant_name(), restaurantObject.getRestaurant_number(), restaurantObject.getRestaurant_address(), restaurantObject.getRestaurant_hours_open(), restaurantObject.getRestaurant_hours_close(), restaurantObject.getRestaurant_description(), restaurantObject.getRestaurant_coverimg()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateRestaurant(request, respond) {
        var restaurantObject = new Restaurant(request.params.restaurant_id, request.body.restaurant_name, request.body.restaurant_number, request.body.restaurant_address, request.body.restaurant_hours_open, request.body.restaurant_hours_close, request.body.restaurant_description);
        var sql = "UPDATE aerofoodDB.restaurant_info SET restaurant_name = ?, restaurant_number = ?, restaurant_address = ?, restaurant_hours_open = ?, restaurant_hours_close = ?, restaurant_description = ? WHERE restaurant_id = ?";
        var values = [restaurantObject.getRestaurant_name(), restaurantObject.getRestaurant_number(), restaurantObject.getRestaurant_address(), restaurantObject.getRestaurant_hours_open(), restaurantObject.getRestaurant_hours_close(), restaurantObject.getRestaurant_description(), restaurantObject.getRestaurant_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    searchRestaurant(request, respond) {
        var restaurant_name = request.params.restaurant_name;
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_info.restaurant_coverimg, cast(avg(review_info.review_rating) as decimal(2, 1)) avg_review_ratings, cuisine_type.cuisine_type FROM ( ( ( restaurant_info LEFT JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) LEFT JOIN restaurant_cuisine ON restaurant_cuisine.restaurantid = restaurant_info.restaurant_id ) LEFT JOIN cuisine_type ON cuisine_type.cuisine_type_id = restaurant_cuisine.cuisine_id ) WHERE restaurant_name LIKE '%' ? '%' GROUP BY restaurant_info.restaurant_id ";

        db.query(sql, restaurant_name, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getRestaruantInfo(request, respond) {
        var restaurant_id = request.params.restaurant_id;
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_description, avg(review_info.review_rating), restaurant_image.image_id, restaurant_image.image, cuisine_type.cuisine_type FROM ( ( ( ( restaurant_info LEFT JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) LEFT JOIN restaurant_image ON restaurant_info.restaurant_id = restaurant_image.restaurant_id ) LEFT JOIN restaurant_cuisine ON restaurant_cuisine.restaurantid = restaurant_info.restaurant_id ) LEFT JOIN cuisine_type ON cuisine_type.cuisine_type_id = restaurant_cuisine.cuisine_id ) WHERE restaurant_info.restaurant_id = ?";

        db.query(sql, restaurant_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getAllRestaurantImage(request, respond) {
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_image.image_id, restaurant_image.image FROM aerofoodDB.restaurant_info INNER JOIN restaurant_image ON restaurant_info.restaurant_id = restaurant_image.restaurant_id ";

        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getRestaurantImage(request, respond) {
        var restaurant_id = request.params.restaurant_id;
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_image.image_id, restaurant_image.image FROM aerofoodDB.restaurant_info INNER JOIN restaurant_image ON restaurant_info.restaurant_id = restaurant_image.restaurant_id WHERE restaurant_info.restaurant_id = ?";

        db.query(sql, restaurant_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getRestaurantDetails(request, respond) {
        var restaurant_id = request.params.restaurant_id;
        var sql = "SELECT cast(avg(review_info.review_rating) as decimal(2, 1)) avg_review_ratings, restaurant_info.restaurant_id, restaurant_info.restaurant_name, restaurant_info.restaurant_number, restaurant_info.restaurant_address, restaurant_info.restaurant_hours_open, restaurant_info.restaurant_hours_close, restaurant_info.restaurant_description FROM ( aerofoodDB.restaurant_info INNER JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) WHERE restaurant_id = ?";

        db.query(sql, restaurant_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getRestaurantReviews(request, respond) {
        var restaurant_id = request.params.restaurant_id;
        var sql = "SELECT restaurant_info.restaurant_id, restaurant_info.restaurant_name, review_info.review_id, review_info.review_body, review_info.review_rating, review_info.review_timestamp, user_info.user_id, user_info.username, user_info.user_active, user_info.user_avatar FROM ( ( restaurant_info LEFT JOIN review_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk ) LEFT JOIN user_info ON user_info.user_id = review_info.user_id ) WHERE restaurant_info.restaurant_id = ? ";

        db.query(sql, restaurant_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteRestaurant(request, respond) {
        var restaurant_id = request.params.restaurant_id;
        var sql = "DELETE FROM aerofoodDB.restaurant_info WHERE restaurant_id = ?";

        db.query(sql, restaurant_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = RestaurantsDB