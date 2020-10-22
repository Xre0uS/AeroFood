var response = "";
var user_array = [];
var ueser_array_reset = [];

function checkforlogin() {
    if (localStorage.getItem("loginstatus") == "true" || sessionStorage.getItem("loginstatus") == "true") {
        shloginbtn();
        if (sessionStorage.getItem("loggedusername") == "null" || sessionStorage.getItem("loggedusername") == "" || sessionStorage.getItem("loggedusername") == null) {
            document.getElementById("usergreet").innerHTML = "Welcome, " + localStorage.getItem("loggedusername");

            var update = new XMLHttpRequest();
            update.open("GET", "/user/activate/" + localStorage.getItem("loggedinid"), true);
            update.setRequestHeader("Content-Type", "application/json");
            update.send();
        }
        else {
            document.getElementById("usergreet").innerHTML = "Welcome, " + sessionStorage.getItem("loggedusername");

            var update = new XMLHttpRequest();
            update.open("GET", "/user/activate/" + sessionStorage.getItem("loggedinid"), true);
            update.setRequestHeader("Content-Type", "application/json");
            update.send();
        }
    }
    else {
        shuserbtn();
    }
}

function verifyuser() {
    var usernameinput = document.getElementById("usernamebox").value;
    var passowrdinput = document.getElementById("passwordbox").value;

    var credentials = new Object();
    credentials.username = usernameinput;
    credentials.user_password = passowrdinput;

    var login = new XMLHttpRequest();
    login.open("POST", "/user/login", true);
    login.setRequestHeader("Content-Type", "application/json");

    login.onload = function () {
        response = JSON.parse(login.responseText);

        if (response.message == "1") {
            checkuser(usernameinput);
        }

        else if (response.message == "2") {
            document.getElementById("wronguser").style.display = "none";
            document.getElementById("wrongpassword").style.display = "block";
        }
        else {
            document.getElementById("wrongpassword").style.display = "none";
            document.getElementById("wronguser").style.display = "block";
        }
    }
    login.send(JSON.stringify(credentials));
}

function usersignup() {
    var usernamesignup = document.getElementById("usernamesignupbox").value;
    var emailsignup = document.getElementById("emailsignupbox").value;
    var numsignup = document.getElementById("numsignupbox").value;
    var adsignup = document.getElementById("adsignupbox").value;
    var tpwsignup = document.getElementById("tpwsignupbox").value;
    var pwsignup = document.getElementById("pwsignupbox").value;
    var gendersignup = document.querySelector('input[name="gender"]:checked').value;


    if (usernamesignup == "" || emailsignup == "" || numsignup == "" || adsignup == "" || tpwsignup == "" || pwsignup == "" || gendersignup == "") {
        document.getElementById("warninginfotext").style.display = "block";
        document.getElementById("warningpwtext").style.display = "none";
    }

    else if (tpwsignup !== pwsignup) {
        document.getElementById("warninginfotext").style.display = "none";
        document.getElementById("warningpwtext").style.display = "block";
    }
    else {
        var usernameinput = document.getElementById("usernamesignupbox").value;

        var credentials = new Object();
        credentials.username = usernameinput;

        var login = new XMLHttpRequest();
        login.open("POST", "/user/login", true);
        login.setRequestHeader("Content-Type", "application/json");

        login.onload = function () {
            response = JSON.parse(login.responseText);

            if (response.message == "2") {
                document.getElementById("warningpwtext").style.display = "none";
                document.getElementById("wronguser").style.display = "none";
                document.getElementById("warningusernametext").style.display = "block";
            }
            else {
                var usersignup = new Object();
                usersignup.username = usernamesignup;
                usersignup.user_email = emailsignup;
                usersignup.user_number = numsignup;
                usersignup.user_address = adsignup;
                usersignup.user_password = pwsignup;
                usersignup.user_gender = gendersignup;

                var addUser = new XMLHttpRequest();
                addUser.open("POST", "/user", true);
                addUser.setRequestHeader("Content-Type", "application/json");
                addUser.send(JSON.stringify(usersignup));
                sessionStorage.setItem("loggedusername", usernamesignup);
                sessionStorage.setItem("loginstatus", true);
                shsignupmodal();
                document.getElementById("confirmmodal").style.display = "block"
            }
        }
        login.send(JSON.stringify(credentials));
    }
}

function checkloggedinuser() {
    if (sessionStorage.getItem("loginstatus") == "true") {
        if (sessionStorage.getItem("loggedusername") !== "null" || sessionStorage.getItem("loggedusername") !== "" || sessionStorage.getItem("loggedusername") !== null) {
            if (sessionStorage.getItem("loggedinid") == "null" || sessionStorage.getItem("loggedinid") == "" || sessionStorage.getItem("loggedinid") == null) {
                checkuser(sessionStorage.getItem("loggedusername"))
                console.log("found user")
            }
        }
    }
}

function checkuser(username) {
    var check = new XMLHttpRequest();
    check.open("GET", "/user/check/" + username, true);
    check.setRequestHeader("Content-Type", "application/json");

    check.onload = function () {
        user_array = JSON.parse(check.responseText);
        loginuser();
    };
    check.send();
}

function loginuser() {
    var userid = user_array[0].user_id;
    var username = user_array[0].username;

    var update = new XMLHttpRequest();
    update.open("GET", "/user/activate/" + userid, true);
    update.setRequestHeader("Content-Type", "application/json");
    update.send();

    if (document.getElementById("usercheckbox").checked == true) {
        localStorage.setItem("loginstatus", true);
        localStorage.setItem("loggedinid", userid);
        localStorage.setItem("loggedusername", username);
    }

    else {
        sessionStorage.setItem("loginstatus", true);
        sessionStorage.setItem("loggedinid", userid);
        sessionStorage.setItem("loggedusername", username);
    }
    location.reload();
}

function logout() {
    localStorage.setItem("loginstatus", false);
    localStorage.setItem("loggedinid", "");
    localStorage.setItem("loggedusername", "");
    sessionStorage.setItem("loginstatus", false);
    sessionStorage.setItem("loggedinid", "");
    sessionStorage.setItem("loggedusername", "");
    window.location.href = "home.html";
}

function resetpassword() {
    resetname = document.getElementById("resetpwname").value;

    if (resetname == "") {
        document.getElementById("resetinfotext").style.display = "block";
    }
    else {
        var credentials = new Object();
        credentials.username = resetname;

        var login = new XMLHttpRequest();
        login.open("POST", "/user/login", true);
        login.setRequestHeader("Content-Type", "application/json");

        login.onload = function () {
            response = JSON.parse(login.responseText);

            if (response.message == "3") {
                document.getElementById("resetinfotext").style.display = "block";
            }
            else {
                var check = new XMLHttpRequest();
                check.open("GET", "/user/check/" + resetname, true);
                check.setRequestHeader("Content-Type", "application/json");

                check.onload = function () {
                    ueser_array_reset = JSON.parse(check.responseText);
                    changepassword();
                };
                check.send();
            }
        }
    }
}

function changepassword() {
    userid = ueser_array_reset[0].user_id;
    newps = rand(8);

    var userinfo = new Object;
    userinfo.user_password = newps;

    var update = new XMLHttpRequest();
    update.open("PUT", "/user/updatepassword/" + userid, true)
    update.setRequestHeader("Content-Type", "application/json");
    update.send(JSON.stringify(userinfo));
    document.getElementById("resetconfirmmodal").style.display = "block";
    document.getElementById("resettext").innerHTML = 'Your password has been reset to: ' + newps;
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

/* show and hide models */
var modal = document.getElementById('logincontainer');
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function shloginmodel() {
    var x = document.getElementById("logincontainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function shloginbtn() {
    var x = document.getElementById("loginbtncontainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function shuserbtn() {
    var x = document.getElementById("userbtncontainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function shlogincontainer() {
    var x = document.getElementById("logincontainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function shfpswmodal() {
    var x = document.getElementById("fpswmodal");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function shsignupmodal() {
    var x = document.getElementById("signupcontainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}