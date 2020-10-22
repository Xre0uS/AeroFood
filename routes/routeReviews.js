"use strict"

const reviewdb = require('../models/reviewsDB');

var reviewsDBObject = new reviewdb();

function routeReviews(app) {
    app.route('/reviews')
        .post(reviewsDBObject.addReview);
    app.route('/reviews/:review_id')
        .delete(reviewsDBObject.deleteReview)
        .put(reviewsDBObject.updateReview);
}
module.exports = { routeReviews };