"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const routeReviews = require('./routes/routeReviews');
const routeRestaurants = require('./routes/routeRestaurants');
const routeUsers = require('./routes/routeUsers');
const routeRestaurantImages = require('./routes/routeRestaurant_images');
const rouRestaurantCuisine = require('./routes/routeRestaurantCuisine');
const routeCuisineType = require('./routes/routeCuisineType');

var app = express();
var host = "127.0.0.1";
var port = 8080;
var startPage = "home.html";

app.use(bodyParser({limit: '50mb'}));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeReviews.routeReviews(app);
routeRestaurants.routeRestaurants(app);
routeUsers.routeUsers(app);
routeRestaurantImages.routeRestaurantsImages(app);
rouRestaurantCuisine.routeRestaurantCuisine(app);
routeCuisineType.routeCuisineTypes(app);

function gotoIndex(req, res) {
    console.log(req.params);
    res.sendFile(__dirname + "/" + startPage);
}

app.get("/" + startPage, gotoIndex);

app.route("/");

var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});