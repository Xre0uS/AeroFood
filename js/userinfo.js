var user_array = [];
var userid = "";
var username;
var user_img_g = "";

if (localStorage.getItem("loginstatus") == "true") {
    userid = localStorage.getItem("loggedinid")
    username = localStorage.getItem("loggedusername")
}
else {
    userid = sessionStorage.getItem("loggedinid")
    username = sessionStorage.getItem("loggedusername")
}

function filluserinfo() {
    var request = new XMLHttpRequest();
    request.open("GET", "/user/profile/" + userid, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        user_array = JSON.parse(request.responseText);
        autofill();
    }
    request.send();
}

function autofill() {
    var username = user_array[0].username;
    var email = user_array[0].user_email;
    var number = user_array[0].user_number;
    var address = user_array[0].user_address;
    var avatar = user_array[0].user_avatar;

    document.getElementById("emailbox").value = email;
    document.getElementById("numbox").value = number;
    document.getElementById("addbox").value = address;

    if (avatar !== "" && avatar !== null && avatar !== "null") {
        document.getElementById("avatarcontainer").innerHTML = '<img class="useravatar" src=' + avatar + '>'
    }

    if (username == "") {
        document.getElementById("username").innerHTML = "PASSWORD RESET";
    }
    else {
        document.getElementById("username").innerHTML = username;
    }
}

function readImage(input) {
    if (input.files && input.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
            user_img_g = e.target.result;
        };
        FR.readAsDataURL(input.files[0]);
    }
}

function updateinfo() {
    var email = document.getElementById("emailbox").value;
    var number = document.getElementById("numbox").value;
    var address = document.getElementById("addbox").value;

    if (email == "" || number == "" || address == "" || user_img_g == "") {
        document.getElementById("warninginfotext").style.display = "block";
    }

    else {
        var userinfo = new Object;
        userinfo.user_email = email;
        userinfo.user_number = number;
        userinfo.user_address = address;
        userinfo.user_avatar = user_img_g;
        console.log(user_img_g)

        var update = new XMLHttpRequest();
        update.open("PUT", "/user/" + userid, true)
        update.setRequestHeader("Content-Type", "application/json");
        update.send(JSON.stringify(userinfo));
        document.getElementById("updateinfomodal").style.display = "block"
    };
}

function updatepassword() {
    var oldpw = document.getElementById("oldpwbox").value;
    var newpw = document.getElementById("newpwbox").value;
    var cnewpw = document.getElementById("cnewpwbox").value;

    if (oldpw == "" || newpw == "" || cnewpw == "") {
        document.getElementById("misspwtext").style.display = "block"
        document.getElementById("diffpwtext").style.display = "none"
    }

    if (newpw !== cnewpw) {
        document.getElementById("misspwtext").style.display = "none"
        document.getElementById("diffpwtext").style.display = "block"
    }

    else {
        var credentials = new Object();
        credentials.username = username;
        credentials.user_password = oldpw;

        var login = new XMLHttpRequest();
        login.open("POST", "/user/login", true);
        login.setRequestHeader("Content-Type", "application/json");

        login.onload = function () {
            response = JSON.parse(login.responseText);

            if (response.message == "1") {
                changepassword(newpw);
            }

            else if (response.message == "2") {
                document.getElementById("diffpwtext").style.display = "none"
                document.getElementById("misspwtext").style.display = "none"
                document.getElementById("wrongpwtext").style.display = "block";
            }
        }
        login.send(JSON.stringify(credentials));
    }
}

function changepassword(userpassword) {
    var userinfo = new Object;
    userinfo.user_password = userpassword;

    var update = new XMLHttpRequest();
    update.open("PUT", "/user/updatepassword/" + userid, true)
    update.setRequestHeader("Content-Type", "application/json");
    update.send(JSON.stringify(userinfo));
    document.getElementById("updatepasswordmodal").style.display = "block"
}

function deactivateuser() {
    var update = new XMLHttpRequest();
    update.open("GET", "/user/deactivate/" + userid, true);
    update.setRequestHeader("Content-Type", "application/json");
    update.send();
    document.getElementById("deactivatemodal").style.display = "block"
}

function deluser() {
    var change = new XMLHttpRequest();
    change.open("GET", "/user/deactivate/" + userid, true);
    change.setRequestHeader("Content-Type", "application/json");
    change.send();

    var userinfo = new Object;
    userinfo.username = rand(20);

    var update = new XMLHttpRequest();
    update.open("PUT", "/user/delete/" + userid, true)
    update.setRequestHeader("Content-Type", "application/json");
    update.send(JSON.stringify(userinfo));
    document.getElementById("delmodal").style.display = "block"
}


function gohome() {
    localStorage.setItem("loginstatus", false);
    localStorage.setItem("loggedinid", "");
    localStorage.setItem("loggedusername", "");
    sessionStorage.setItem("loginstatus", false);
    sessionStorage.setItem("loggedinid", "");
    sessionStorage.setItem("loggedusername", "");
    window.location.href = "home.html"
}

function rand(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}