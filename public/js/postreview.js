restaurantId = sessionStorage.getItem("restaurantInfoId");
var userid = "";
var restaurantinfo_array = [];

if (localStorage.getItem("loginstatus") == "true") {
    userid = localStorage.getItem("loggedinid")
}
else {
    userid = sessionStorage.getItem("loggedinid")
}

function displayrestaurant() {
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurants/details/" + restaurantId, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        restaurantinfo_array = JSON.parse(request.responseText);
        displayRestaurantInfo();
    };
    request.send();
}

function displayRestaurantInfo() {
    var restaurantname = restaurantinfo_array[0].restaurant_name;
    document.getElementById("restaurantname").innerHTML = restaurantname;
}

function submitreivew() {
    var rating = document.querySelector('input[name="rating"]:checked').value;
    var reviewbody = document.getElementById("reviewtextbox").value

    if (rating == "" || reviewbody == "") {
        document.getElementById("warningtext").style.display = "block"
    }

    else {
        var review = new Object();
        review.user_id = userid;
        review.restaurant_id_fk = restaurantId;
        review.review_body = reviewbody;
        review.review_rating = rating;

        var addReview = new XMLHttpRequest();
        addReview.open("POST", "/reviews/", true);
        addReview.setRequestHeader("Content-Type", "application/json");

        addReview.send(JSON.stringify(review));
        document.getElementById("confirmmodal").style.display = "block"
    }
}