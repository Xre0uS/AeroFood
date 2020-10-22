"use strict"

const restaurantCuisineDB = require('../models/cuisine_typeDB');

var restaurantCuisineDBObject = new restaurantCuisineDB();

function routeCuisineTypes(app) {
    app.route('/cuisine')
        .post(restaurantCuisineDBObject.addCuisine_type);
    app.route('/cuisine/:cuisine_type_id')
        .delete(restaurantCuisineDBObject.deleteCuisine_type);
    app.route('/filtercuisine/:cuisine_type_id')
        .get(restaurantCuisineDBObject.filterCuisine);
}
module.exports = { routeCuisineTypes }