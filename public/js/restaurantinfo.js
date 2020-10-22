restaurantId = sessionStorage.getItem("restaurantInfoId");
var userloggedin = localStorage.getItem("loginstatus");

var restaurantinfo_array = [];
var restaurantimg_array = [];

function showRestaurantImages() {
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurants/images/" + restaurantId, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        restaurantimg_array = JSON.parse(request.responseText);
        displayRestaurantImages();
    };
    request.send();
}

function showRestaurantInfo() {
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurants/details/" + restaurantId, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        restaurant_array = JSON.parse(request.responseText);
        displayRestaurantInfo();
    };
    request.send();
}
function displayRestaurantImages() {
    for (var i = 0; i < restaurantimg_array.length; i++) {
        var carouselimage = restaurantimg_array[0].image;
        var $cellElems = $('<div class="carousel-cell"><img src=' + carouselimage + '></div>');
        $carousel.flickity('append', $cellElems);
    }
}

function displayRestaurantInfo() {
    var table = document.getElementById('restaurantinfowrapper');
    table.innerHTML = '';
    for (var i = 0; i < restaurant_array.length; i++) {
        var cell = formHTMLforDisplay(restaurant_array[i]);
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}

function formHTMLforDisplay(restaurantinfo) {
    var restaurantid = restaurantinfo.restaurant_id;
    var restaurantName = restaurantinfo.restaurant_name;
    var reviewRating = restaurantinfo.avg_review_ratings;
    var hoursOpen = restaurantinfo.restaurant_hours_open;
    var hoursClose = restaurantinfo.restaurant_hours_close;
    var address = restaurantinfo.restaurant_address;
    var number = restaurantinfo.restaurant_number;
    var description = restaurantinfo.restaurant_description;
    var website = restaurantinfo.restaurant_name.replace(/&#8217;|\s/g, '').toLowerCase();

    if (reviewRating == null) {
        reviewRating = "No Ratings"

        var cell =
            '<div id="restaurantinfowrapper" class="restaurantinfowrapper"> <div class="restaurantname"> <h1>' + restaurantName + '</h1> </div>' +
            '<div class="reviewbtncontainer"> <div class="reviewbtn" onClick="gotorestaurantreviews(' + restaurantid + ')"> Reviews </div> </div> <div class="wreviewbtncontainer" onClick="gotowreview(' + restaurantid + ')"> <a href="#" style="color:#9256F9; text-decoration: none;"> <div class="wreviewbtn"> Write a reivew </div> </a> </div> <div class="bigspace"></div> <div class="ratingwrapper"> <div class="restaurantrating">' +
            reviewRating + ' </div></div><div class="bigspace"></div> <h3>Opening Hours: ' + hoursOpen + ' - ' + hoursClose + '</h3> <div class="bigspace"> </div>' +
            '<h3>Telephone Number: ' + number + '</h3> <div class="bigspace"></div>' +
            '<h3>Address: ' + address + '</h3><div class="bigspace"></div>' +
            '<h3>Restaurant Description: ' + description + '</h3> <div class="bigspace"></div> <div class="restaurantsite"> <a href="#"> <h3>' +
            website + '.com.sg</h3> </a> </div> </div>'
        return cell;
    }

    else {
        reviewRating = reviewRating.toFixed(1);
        var cell =
            '<div id="restaurantinfowrapper" class="restaurantinfowrapper"> <div class="restaurantname"> <h1>' + restaurantName + '</h1> </div>' +
            '<div class="reviewbtncontainer"> <div class="reviewbtn" onClick="gotorestaurantreviews(' + restaurantid + ')"> Reviews </div> </div> <div class="wreviewbtncontainer" onClick="gotowreview(' + restaurantid + ')"> <a href="#" style="color:#9256F9; text-decoration: none;"> <div class="wreviewbtn"> Write a reivew </div> </a> </div> <div class="bigspace"></div> <div class="ratingwrapper"> <div class="restaurantrating">' +
            reviewRating + '</div>' + '<div class="star"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 14.25"><path id="ic_star_24px" d="M9.5,13.453l4.635,2.8-1.23-5.273L17,7.43l-5.392-.457L9.5,2,7.392,6.972,2,7.43l4.1,3.547L4.865,16.25Z" transform="translate(-2 -2)" fill="#9256f9" /> </svg></div>' +
            '</div><div class="bigspace"></div> <h3>Opening Hours: ' + hoursOpen + ' - ' + hoursClose + '</h3> <div class="bigspace"> </div>' +
            '<h3>Telephone Number: ' + number + '</h3> <div class="bigspace"></div>' +
            '<h3>Address: ' + address + '</h3><div class="bigspace"></div>' +
            '<h3>Restaurant Description: ' + description + '</h3> <div class="bigspace"></div> <div class="restaurantsite"> <a href="#"> <h3>' +
            website + '.com.sg</h3> </a> </div> </div>'
        return cell;
    }
}

function readImage(input) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            restaurant_img_g = e.target.result;
        };
        FR.readAsDataURL(input.files[0]);
    }
}

function addRestaurantImg() {
    var restaurant = new Object();
    restaurant.restaurant_id = restaurantId;
    restaurant.image = restaurant_img_g;

    var addRestaurant = new XMLHttpRequest();
    addRestaurant.open("POST", "/restaurantimage/", true);
    addRestaurant.setRequestHeader("Content-Type", "application/json");

    addRestaurant.send(JSON.stringify(restaurant));
    shaddimgmodel()
    document.getElementById("confirmmodal").style.display = "block"
}

function shaddimgmodel() {
    var x = document.getElementById("addimgmodal");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
        location.reload;
    }
}

function gotorestaurantreviews(restaurantId) {
    sessionStorage.setItem("restaurantidreview", restaurantId);
    window.location.href = "restaurantreviews.html";
}

function gotowreview(restaurantid) {
    if (localStorage.getItem("loginstatus") !== "true" && sessionStorage.getItem("loginstatus") !== "true") {
        document.getElementById("notloggedinmodal").style.display = "block";
    }
    else {
        sessionStorage.setItem("restaurantidreview", restaurantid);
        window.location.href = "postreview.html";
    }
}