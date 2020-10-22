"use strict"

class Reviews {
    constructor(review_id, user_id, restaurant_id_fk, review_body, review_rating, review_timestamp) {
        this.review_id = review_id;
        this.user_id = user_id;
        this.restaurant_id_fk = restaurant_id_fk;
        this.review_body = review_body;
        this.review_rating = review_rating;
        this.review_timestamp = review_timestamp;
    }

    getReview_id() {
        return this.review_id;
    }
    getUser_id() {
        return this.user_id;
    }
    getrestaurant_id_fk() {
        return this.restaurant_id_fk;
    }
    getReview_body() {
        return this.review_body;
    }
    getReview_rating() {
        return this.review_rating;
    }
    getReview_timestamp() {
        return this.review_timestamp;
    }

    setreview_id(review_id) {
        this.review_id = review_id;
    }
    setUser_id(user_id) {
        this.user_id = user_id;
    }
    setrestaurant_id_fk(restaurant_id_fk) {
        this.restaurant_id_fk = restaurant_id_fk;
    }
    setReview_body(review_body) {
        this.review_body = review_body;
    }
    setReview_rating(review_rating) {
        this.review_rating = review_rating;
    }
    setReview_timestamp(review_timestamp) {
        this.review_timestamp = review_timestamp;
    }
}
module.exports = Reviews;