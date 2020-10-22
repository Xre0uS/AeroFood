var review_array = [];
var userid = "";

if (localStorage.getItem("loginstatus") == "true") {
    userid = localStorage.getItem("loggedinid")
}
else {
    userid = sessionStorage.getItem("loggedinid")
}

function listAllReviews() {
    var request = new XMLHttpRequest();
    request.open("GET", "/user/userreviews/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        review_array = JSON.parse(request.responseText);
        displayReviews();
    }
    request.send();
}

function displayReviews() {
    var table = document.getElementById('grid');
    table.innerHTML = '';

    for (var i = 0; i < review_array.length; i++) {
        var cell = formHTMLforDisplay(review_array[i]);
        table.insertAdjacentHTML('beforeEnd', cell);
    }
}

function formHTMLforDisplay(reviews) {
    var restaurantName = reviews.restaurant_name;
    var reviewBody = reviews.review_body;
    var reviewRating = reviews.review_rating;
    var timestamp = reviews.review_timestamp;
    var reviewid = reviews.review_id;

    reviewRating = reviewRating.toFixed(1)

    var cell =
        '<div class="module"> <div class="modulecontainer"> <div class="restaurantname"> <h3>Review On: ' + restaurantName + '</h3>' +
        '</div> <div class="userreivewtimestamp">' + timestamp + '</div> <div class="userreivewcontainer"> <div class="star"> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.25" viewBox="0 0 15 14.25"> <path id="ic_star_24px" d="M9.5,13.453l4.635,2.8-1.23-5.273L17,7.43l-5.392-.457L9.5,2,7.392,6.972,2,7.43l4.1,3.547L4.865,16.25Z" transform="translate(-2 -2)" fill="#9256f9" /></svg> </div>' +
        '<div class="userreviewrating">' + reviewRating + ' / 5.0</div> </div> <div class="userreviewbodycontainer">' +
        '<div class="userreviewbody">' + reviewBody + '</div> </div>' +
        '<div id="delreview" onclick="delreview(' + reviewid + ')" class="delreview"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="32.143" viewBox="0 0 25 32.143"> <path id="ic_delete_forever_24px" d="M6.786,31.571a3.582,3.582,0,0,0,3.571,3.571H24.643a3.582,3.582,0,0,0,3.571-3.571V10.143H6.786Zm4.393-12.714L13.7,16.339l3.8,3.786,3.786-3.786L23.8,18.857l-3.786,3.786L23.8,26.429l-2.518,2.518L17.5,25.161l-3.786,3.786L11.2,26.429l3.786-3.786ZM23.75,4.786,21.964,3H13.036L11.25,4.786H5V8.357H30V4.786Z" transform="translate(-5 -3)" fill="#fc6d6d" /> </svg> </div> </div> </div>'

    return cell;
}

function delreview(reviewid) {
    var request = new XMLHttpRequest();
    request.open("DELETE", "/reviews/" + reviewid, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    document.getElementById("confirmmodal").style.display = "block";
}

