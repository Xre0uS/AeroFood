"use strict"

class Restaurant_cuisine {
    constructor(restaurant_cuisine_id, cuisine_id, restaurantid) {
        this.restaurant_cuisine_id = restaurant_cuisine_id;
        this.cuisine_id = cuisine_id;
        this.restaurantid = restaurantid;
    }

    getRestaurant_cuisine_id() {
        return this.restaurant_cuisine_id;
    }
    getCuisine_id() {
        return this.cuisine_id;
    }
    getRestaurant_id() {
        return this.restaurantid;
    }

    setRestaurant_cuisine_id(restaurant_cuisine_id) {
        this.restaurant_cuisine_id = restaurant_cuisine_id;
    }
    setCuisine_id(cuisine_id) {
        this.cuisine_id = cuisine_id;
    }
    setRestaurant_id(restaurantid) {
        this.restaurantid = restaurantid
    }
}
module.exports = Restaurant_cuisine