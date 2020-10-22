var restaurant_array = [];
var restaurantsearchterm = sessionStorage.getItem("restaurantSearchTerm");




function listAllRestaurants() {
    if (restaurantsearchterm == null || restaurantsearchterm == "") {
        //Create a GET Request to the URL /restaurant’
        var request = new XMLHttpRequest();
        request.open("GET", "/restaurants", true);
        request.setRequestHeader("Content-Type", "application/json");
        //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
        request.onload = function () {
            //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
            restaurant_array = JSON.parse(request.responseText);
            shuffle(restaurant_array);
            displayRestaurant();
        };
        request.send();
    }

    else {
        var request = new XMLHttpRequest();
        request.open("GET", "/restaurants/search/" + restaurantsearchterm, true);
        request.setRequestHeader("Content-Type", "application/json");
        //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
        request.onload = function () {
            //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
            restaurant_array = JSON.parse(request.responseText);
            //call displayRestaurant function
            displayRestaurant();
            document.getElementById('sortname').innerHTML = 'Searching: ' + restaurantsearchterm;
            document.getElementById('searchinput').value = restaurantsearchterm;
            $(".searchcontainer, .searchinput").toggleClass("active");
            $(".searchinput").focus();
            restaurantsearchterm = null;
            sessionStorage.removeItem("restaurantSearchTerm");
        };
        request.send();
    }
}

function displayRestaurant() {
    var table = document.getElementById('restaurantgrid');
    table.innerHTML = '';
    for (var i = 0; i < restaurant_array.length; i++) {
        var cell = formHTMLforDisplay(restaurant_array[i]);
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}

function formHTMLforDisplay(restaurants) {
    var restaurantName = restaurants.restaurant_name;
    var cuisineType = restaurants.cuisine_type;
    var reviewRating = restaurants.avg_review_ratings;
    var restaurantCoverimg = restaurants.restaurant_coverimg;
    var restaurantId = restaurants.restaurant_id;

    if (reviewRating == null) {
        reviewRating = "No Ratings"

        var cell =
            '<div class="module" onclick="openrestaurantinfo(' + restaurantId + ')">' +
            '<img class="restaurantimg" src=' + restaurantCoverimg + '>' +
            '<div class="restaurantname">' + restaurantName + '</div>' +
            '<div class="cuisinetype">' + cuisineType + '</div>' +
            '<div class="ratingscontainer">' +
            '<div class="ratings">' + reviewRating + '</div>' +
            '</div>' +
            '</div>'
        return cell;
    }
    
    else {
        reviewRating = reviewRating.toFixed(1);
        var cell =
            '<div class="module" onclick="openrestaurantinfo(' + restaurantId + ')">' +
            '<img class="restaurantimg" src=' + restaurantCoverimg + '>' +
            '<div class="restaurantname">' + restaurantName + '</div>' +
            '<div class="cuisinetype">' + cuisineType + '</div>' +
            '<div class="ratingscontainer">' +
            '<div class="ratings">' + reviewRating + '</div>' +
            '<div class="star"> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.25" viewBox="0 -2.8 14 16"> <path id="ic_star_24px" d="M9.5,13.453l4.635,2.8-1.23-5.273L17,7.43l-5.392-.457L9.5,2,7.392,6.972,2,7.43l4.1,3.547L4.865,16.25Z" transform="translate(-2 -2)" fill="#9256f9"/> </svg></div>' +
            '</div>' +
            '</div>'
        return cell;
    }
}

function search() {
    //Retrieve search term from Restaurant.html of element with id= searchTerm
    var searchTerm = document.getElementById('searchinput').value;
    if (searchTerm == null || searchTerm == "") {
        listAllRestaurants()
        document.getElementById('sortname').innerHTML = 'All Restaurants'
    }
    else {
        //Create a GET Request to the URL ‘searchRestaurant/name’
        var request = new XMLHttpRequest();
        request.open("GET", "/restaurants/search/" + searchTerm, true);
        request.setRequestHeader("Content-Type", "application/json");
        //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
        request.onload = function () {
            //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
            restaurant_array = JSON.parse(request.responseText);
            //call displayRestaurant function
            displayRestaurant();
            document.getElementById('sortname').innerHTML = 'Searching: ' + searchTerm;
        };
        request.send();
    }
}

function filter(filterTerm) {
    //Retrieve search term from Restaurant.html of element with id= searchTerm
    var request = new XMLHttpRequest();
    request.open("GET", "/filtercuisine/" + filterTerm, true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        restaurant_array = JSON.parse(request.responseText);
        //call displayRestaurant function
        displayRestaurant();
    };
    request.send();
}

function openrestaurantinfo(restaurantId) {
    sessionStorage.setItem("restaurantInfoId", restaurantId);
    window.location.href = "restaurantinfo.html"
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