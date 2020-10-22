"use strict"

class Restaurants {
    constructor(restaurant_id, restaurant_name, restaurant_number, restaurant_address, restaurant_hours_open, restaurant_hours_close, restaurant_description, restaurant_coverimg) {
        this.restaurant_id = restaurant_id;
        this.restaurant_name = restaurant_name;
        this.restaurant_number = restaurant_number;
        this.restaurant_address = restaurant_address;
        this.restaurant_hours_open = restaurant_hours_open;
        this.restaurant_hours_close = restaurant_hours_close
        this.restaurant_description = restaurant_description;
        this.restaurant_coverimg = restaurant_coverimg;
    }

    getRestaurant_id() {
        return this.restaurant_id;
    }
    getRestaurant_name() {
        return this.restaurant_name;
    }
    getRestaurant_number() {
        return this.restaurant_number;
    }
    getRestaurant_address() {
        return this.restaurant_address;
    }
    getRestaurant_hours_open() {
        return this.restaurant_hours_open;
    }
    getRestaurant_hours_close() {
        return this.restaurant_hours_close;
    }
    getRestaurant_description() {
        return this.restaurant_description;
    }
    getRestaurant_coverimg() {
        return this.restaurant_coverimg;
    }

    setRestaurant_id(restaurant_id) {
        this.restaurant_id = restaurant_id;
    }
    setRestaurant_name(restaurant_name) {
        this.restaurant_name = restaurant_name;
    }
    setRestaurant_rating(restaurant_rating) {
        this.restaurant_rating = restaurant_rating;
    }
    setRestaurant_number(restaurant_number) {
        this.restaurant_number = restaurant_number;
    }
    setRestaurant_address(restaurant_address) {
        this.restaurant_address = restaurant_address;
    }
    setRestaurant_hours_open() {
        this.restaurant_hours_open = restaurant_hours_open;
    }
    setRestaurant_hours_close(Restaurant_hours_close) {
        this.Restaurant_hours_close = Restaurant_hours_close;
    }
    setRestaurant_description(restaurant_description) {
        this.restaurant_description = restaurant_description;
    }
}
module.exports = Restaurants