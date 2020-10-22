"use strict"

var db = require('../db-connection');
const User = require('./users');

class UsersDB {

    addUser(request, respond) {
        var userObject = new User(null, request.body.username, request.body.user_password, request.body.user_gender, request.body.user_email, request.body.user_number, request.body.user_address, request.body.user_avatar, request.body.user_active);
        var sql = "INSERT INTO aerofoodDB.user_info (username, user_password, user_gender, user_email, user_number, user_address, user_avatar,user_active) VALUES(?,?,?,?,?,?,?,1)";
        var values = [userObject.getUsername(), userObject.getUser_password(), userObject.getUser_gender(), userObject.getUser_email(), userObject.getUser_number(), userObject.getUser_address(), userObject.getUser_avatar()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getLoginCredentials(request, respond) {
        var username = request.body.username;
        var user_password = request.body.user_password;
        var msg = "";

        var sql = "SELECT user_password FROM user_info WHERE username = ?";

        db.query(sql, [username], function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length > 0) {
                    if (user_password == result[0].user_password) {
                        msg = "1"; //success
                        console.log(msg);
                    }
                    else {
                        msg = "2"; //wrong pw
                        console.log(msg);
                    }
                }
                else {
                    msg = "3"; //user not found
                    console.log(msg);
                }
                respond.json(prepareMessage(msg));
            }
        });
    }

    checkUser(request, respond) {
        var username = request.params.username;
        var sql = "SELECT user_id, username FROM user_info WHERE username = ?"

        db.query(sql, username, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateUserInfo(request, respond) {
        var userObject = new User(request.params.user_id, request.username, request.user_password, request.user_gender, request.body.user_email, request.body.user_number, request.body.user_address, request.body.user_avatar);
        var sql = "UPDATE aerofoodDB.user_info SET user_email = ?, user_number = ?, user_address = ?, user_avatar = ? WHERE user_id = ? ";
        var values = [userObject.getUser_email(), userObject.getUser_number(), userObject.getUser_address(), userObject.getUser_avatar(), userObject.getUser_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    updateUserPassword(request, respond) {
        var userObject = new User(request.params.user_id, request.username, request.body.user_password);
        var sql = "UPDATE user_info SET user_password = ? WHERE user_id = ? ";
        var values = [userObject.getUser_password(), userObject.getUser_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deluser(request, respond) {
        var userObject = new User(request.params.user_id, request.body.username);
        var sql = "UPDATE user_info SET username = ? WHERE user_id = ? ";
        var values = [userObject.getUsername(), userObject.getUser_id()];

        db.query(sql, values, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    userActivate(request, respond) {
        var user_id = request.params.user_id;
        var sql = "UPDATE aerofoodDB.user_info SET user_active = 1 WHERE user_id = ?";

        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    userDeactivate(request, respond) {
        var user_id = request.params.user_id;
        var sql = "UPDATE aerofoodDB.user_info SET user_active = 0 WHERE user_id = ?";

        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getUserReviews(request, respond) {
        var user_id = request.params.user_id;
        var sql = "SELECT user_info.user_id, user_info.username, review_info.review_id, review_info.review_timestamp, review_info.review_rating, review_info.review_body, restaurant_info.restaurant_name FROM ( review_info INNER JOIN user_info ON user_info.user_id = review_info.user_id ) INNER JOIN restaurant_info ON restaurant_info.restaurant_id = review_info.restaurant_id_fk AND user_info.user_id = ? "

        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    getUserProfie(request, respond) {
        var user_id = request.params.user_id;
        var sql = "SELECT * FROM aerofoodDB.user_info WHERE user_id = ?"

        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    deleteUser(request, respond) {
        var user_id = request.params.user_id;
        var sql = "DELETE FROM aerofoodDB.user_info WHERE user_id = ?";

        db.query(sql, user_id, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }
}

function prepareMessage(msg) {
    var obj = { "message": msg };
    return obj;
}

module.exports = UsersDB