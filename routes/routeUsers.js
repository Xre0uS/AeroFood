"use strict"

const userdb = require('../models/usersDB');

var usersDBObject = new userdb();

function routeUsers(app) {
    app.route('/user')
        .post(usersDBObject.addUser);
    app.route('/user/:user_id')
        .delete(usersDBObject.deleteUser)
        .put(usersDBObject.updateUserInfo)
    app.route('/user/login')
        .post(usersDBObject.getLoginCredentials);
    app.route('/user/check/:username')
        .get(usersDBObject.checkUser);
    app.route('/user/delete/:user_id')
        .put(usersDBObject.deluser);
    app.route('/user/updatepassword/:user_id')
        .put(usersDBObject.updateUserPassword);
    app.route('/user/activate/:user_id')
        .get(usersDBObject.userActivate);
    app.route('/user/deactivate/:user_id')
        .get(usersDBObject.userDeactivate);
    app.route('/user/userreviews/:user_id')
        .get(usersDBObject.getUserReviews);
    app.route('/user/profile/:user_id')
        .get(usersDBObject.getUserProfie);
}
module.exports = { routeUsers };