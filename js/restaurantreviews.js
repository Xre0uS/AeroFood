var review_array = [];
var restaurantId = sessionStorage.getItem("restaurantidreview");

function listAllReviews() {
    var request = new XMLHttpRequest();
    request.open("GET", "/restaurants/reviews/" + restaurantId, true);
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
    var userName = reviews.username;
    var reviewBody = reviews.review_body;
    var reviewRating = reviews.review_rating;
    var timestamp = reviews.review_timestamp;
    var userActive = reviews.user_active;
    var avatar = reviews.user_avatar;
    document.getElementById("restaurantname").innerHTML = restaurantName;

    if (userActive == 0) {
        return " ";
    }

    else if (reviewBody == null || reviewBody == "") {
        document.getElementById("noreviewsmsg").style.display = "block"
        return " ";
    }

    else if (avatar == null || avatar == "") {
        reviewRating = reviewRating.toFixed(1)

        var cell =
            '<div class="module"> <div class="modulecontainer"> <div class="userreviewimg"><svg id="Component_1_1" data-name="Component 1 – 1" xmlns="http://www.w3.org/2000/svg"width="56" height="56" viewBox="0 0 56 56"> <g id="Ellipse_2" data-name="Ellipse 2" fill="none" stroke="#575757" stroke-width="1"><circle cx="28" cy="28" r="28" stroke="none" /><circle cx="28" cy="28" r="27.5" fill="none" /></g><path id="ic_person_24px"d="M21.849,21.849a8.925,8.925,0,1,0-8.925-8.925A8.922,8.922,0,0,0,21.849,21.849Zm0,4.462C15.892,26.311,4,29.3,4,35.236V39.7H39.7V35.236C39.7,29.3,27.806,26.311,21.849,26.311Z" transform="translate(6 5.111)" fill="rgba(146,86,249,0.6)" /></svg></div>' +
            '<div class="userreviewname">' + userName + '</div>' +
            '<div class="userreivewtimestamp">' + timestamp + '</div>' +
            '<div class="userreivewcontainer"> <div class="star"> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.25" viewBox="0 0 15 14.25"> <path id="ic_star_24px" d="M9.5,13.453l4.635,2.8-1.23-5.273L17,7.43l-5.392-.457L9.5,2,7.392,6.972,2,7.43l4.1,3.547L4.865,16.25Z" transform="translate(-2 -2)" fill="#9256f9" /></svg></div>' +
            '<div class="userreviewrating">' + reviewRating + ' / 5.0</div></div>' +
            '<div class="userreviewbodycontainer"> <div class="userreviewbody">' + reviewBody + '</div></div></div></div>'
        return cell;
    }

    else {
        reviewRating = reviewRating.toFixed(1)

        var cell =
            '<div class="module"> <div class="modulecontainer"> <img class="userreviewimg" src=' + avatar + '>' +
            '<div class="userreviewname">' + userName + '</div>' +
            '<div class="userreivewtimestamp">' + timestamp + '</div>' +
            '<div class="userreivewcontainer"> <div class="star"> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.25" viewBox="0 0 15 14.25"> <path id="ic_star_24px" d="M9.5,13.453l4.635,2.8-1.23-5.273L17,7.43l-5.392-.457L9.5,2,7.392,6.972,2,7.43l4.1,3.547L4.865,16.25Z" transform="translate(-2 -2)" fill="#9256f9" /></svg></div>' +
            '<div class="userreviewrating">' + reviewRating + ' / 5.0</div></div>' +
            '<div class="userreviewbodycontainer"> <div class="userreviewbody">' + reviewBody + '</div></div></div></div>'
        return cell;
    }
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