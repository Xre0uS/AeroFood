var restaurant_img_g = null;

function readImage(input) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            restaurant_img_g = e.target.result;
        };
        FR.readAsDataURL(input.files[0]);
    }
}

function submit() {
    var restaurantimg = restaurant_img_g;
    var restaurantname = document.getElementById("restaurantname").value;
    var restaurantnumber = document.getElementById("restaurantnumber").value;
    var restaurantaddress = document.getElementById("restaurantaddress").value;
    var restaurantopen = document.getElementById("restaurantopen").value;
    var restaurantclose = document.getElementById("restaurantclose").value;
    var restaurantdescription = document.getElementById("restaurantdescription").value;

    if (restaurantname == null || restaurantname == '' || restaurantnumber == null || restaurantnumber == '' || restaurantaddress == null || restaurantaddress == '' || restaurantopen == null || restaurantopen == '' || restaurantclose == null || restaurantclose == '' || restaurantdescription == null || restaurantdescription == '' || restaurantimg == null || restaurantimg == '') {

        document.getElementById("infomessage").style.display = "block"
    }

    else {
        var restaurant = new Object();
        restaurant.restaurant_name = restaurantname;
        restaurant.restaurant_number = restaurantnumber;
        restaurant.restaurant_address = restaurantaddress;
        restaurant.restaurant_hours_open = restaurantopen;
        restaurant.restaurant_hours_close = restaurantclose;
        restaurant.restaurant_description = restaurantdescription;
        restaurant.restaurant_coverimg = restaurantimg;

        var addRestaurant = new XMLHttpRequest();
        addRestaurant.open("POST", "/restaurants", true);
        addRestaurant.setRequestHeader("Content-Type", "application/json");

        addRestaurant.onload = function () {
            window.location.href = "/restaurants.html"
        }
        addRestaurant.send(JSON.stringify(restaurant));
    }
}