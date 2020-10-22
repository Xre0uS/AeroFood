"use strict"

class Cuisine_type {
    constructor(cuisine_type_id, cuisine_type) {
        this.cuisine_type_id = cuisine_type_id;
        this.cuisine_type = cuisine_type;
    }

    getCuisine_type_id() {
        return this.cuisine_type_id;
    }
    getCuisine_type() {
        return this.cuisine_type;
    }

    setCuisine_type_id(cuisine_type_id) {
        this.cuisine_type_id = cuisine_type_id;
    }
    setCuisine_type(cuisine_type) {
        this.cuisine_type = cuisine_type;
    }
}
module.exports = Cuisine_type