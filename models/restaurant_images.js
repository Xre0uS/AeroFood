"use strict"

class RestaurantImages {
    constructor(image_id, restaurant_id, image) {
        this.image_id = image_id;
        this.restaurant_id = restaurant_id;
        this.image = image;
    }

    getImage_id() {
        return this.image_id;
    }
    getRestaurant_id() {
        return this.restaurant_id;
    }
    getImage() {
        return this.image;
    }

    setImage_id(image_id) {
        this.image_id = image_id;
    }
    setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }
    setImage(image) {
        this.image = image;
    }
}
module.exports = RestaurantImages