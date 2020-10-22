"use strict"

var db = require('../db-connection');
const Restaurant_images = require('./restaurant_images');

class Restaurant_imagesDB {

    addImages(request, respond) {
        var restaurantImageObject = new Restaurant_images(null, request.body.restaurant_id, request.body.image);
        var sql = "INSERT INTO aerofoodDB.restaurant_image (restaurant_id, image) VALUES(?, ?)";
        var values = [restaurantImageObject.getRestaurant_id(), restaurantImageObject.getImage()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateImages(request, respond) {
        var restaurantImageObject = new Restaurant_images(request.params.image_id, request.restaurant_id, request.body.image);
        var sql = "UPDATE aerofoodDB.restaurant_image SET image= ? WHERE image_id = ?"
        var values = [restaurantImageObject.getImage_id(), restaurantImageObject.getImage()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;``
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteImages(request, respond) {
        var image_id = request.params.image_id;
        var sql = "DELETE FROM restaurant_image WHERE imagegroup_id = ?";

        db.query(sql, image_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = Restaurant_imagesDB