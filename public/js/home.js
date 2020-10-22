var restaurantimg_array = [];

function showRestaurantImages() {
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurants/images/", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        restaurantimg_array = JSON.parse(request.responseText);
        shuffle(restaurantimg_array);
        displayRestaurantImages();
    };
    request.send();
}

function displayRestaurantImages() {
    for (var i = 0; i < restaurantimg_array.length; i++) {
        var restaurantname = restaurantimg_array[i].restaurant_name;
        var carouselimage = restaurantimg_array[i].image;
        var restaurantid = restaurantimg_array[i].restaurant_id;
        var $cellElems = $('<div class="carousel-cell" ><img src=' + carouselimage + '><div class = "img-description" onclick="openrestaurantinfo(' + restaurantid + ')">' + restaurantname + '</div></div>');
        $carousel.flickity('append', $cellElems);
    }
}

function shuffle(restaurantimg_array) {
    var currentIndex = restaurantimg_array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = restaurantimg_array[currentIndex];
        restaurantimg_array[currentIndex] = restaurantimg_array[randomIndex];
        restaurantimg_array[randomIndex] = temporaryValue;
    }

    return restaurantimg_array;
}

function openrestaurantinfo(restaurantid) {
    sessionStorage.setItem("restaurantInfoId", restaurantid);
    window.location.href = "restaurantinfo.html";
}