"use strict"

const restaurantImagesDB = require('../models/restaurant_imagesDB');

var restaurantImagesDBObject = new restaurantImagesDB();

function routeRestaurantsImages(app) {
    app.route('/restaurantimage')
        .post(restaurantImagesDBObject.addImages);
    app.route('/restaurantimage/:image_id')
        .delete(restaurantImagesDBObject.deleteImages)
        .put(restaurantImagesDBObject.updateImages);
}
module.exports = { routeRestaurantsImages };