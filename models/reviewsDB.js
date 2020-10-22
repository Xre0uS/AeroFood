"use strict"

var db = require('../db-connection');
const Review = require('./reviews');

class ReviewsDB {

    addReview(request, respond) {
        var now = new Date();
        var reviewObject = new Review(null, request.body.user_id, request.body.restaurant_id_fk, request.body.review_body, request.body.review_rating, request.body.review_timestamp, now.toString());
        var sql = "INSERT INTO aerofoodDB.review_info (user_id, restaurant_id_fk, review_body, review_rating, review_timestamp) VALUES(?,?,?,?,?)";
        var values = [reviewObject.getUser_id(), reviewObject.getrestaurant_id_fk(), reviewObject.getReview_body(), reviewObject.getReview_rating(), reviewObject.getReview_timestamp()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateReview(request, respond) {
        var now = new Date();
        var reviewObject = new Review(request.params.review_id, request.user_id, request.restaurant_id_fk, request.body.review_body, request.body.review_rating, request.body.getreview_timestamp, now.toString());
        var sql = "UPDATE aerofoodDB.review_info SET review_body = ?, review_rating = ?, review_timestamp = ? WHERE review_id = ?";
        var values = [reviewObject.getReview_body(), reviewObject.getReview_rating(), reviewObject.getReview_timestamp(), reviewObject.getReview_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteReview(request, respond) {
        var review_id = request.params.review_id;
        var sql = "DELETE FROM aerofoodDB.review_info WHERE review_id = ?";

        db.query(sql, review_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}
module.exports = ReviewsDB