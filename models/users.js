"use strict"

class Users {
    constructor(user_id, username, user_password, user_gender, user_email, user_number, user_address, user_avatar, user_active) {
        this.user_id = user_id;
        this.username = username;
        this.user_password = user_password;
        this.user_gender = user_gender;
        this.user_email = user_email;
        this.user_number = user_number;
        this.user_address = user_address;
        this.user_avatar = user_avatar;
        this.user_active = user_active;
    }

    getUser_id() {
        return this.user_id;
    }
    getUsername() {
        return this.username;
    }
    getUser_password() {
        return this.user_password;
    }
    getUser_gender() {
        return this.user_gender;
    }
    getUser_email() {
        return this.user_email;
    }
    getUser_number() {
        return this.user_number;
    }
    getUser_address() {
        return this.user_address;
    }
    getUser_avatar() {
        return this.user_avatar;
    }
    getUser_active() {
        return this.user_active
    }

    setUser_id(user_id) {
        this.user_id = user_id;
    }
    setUsername(username) {
        this.username = username;
    }
    setUser_password(user_password) {
        this.user_password = user_password;
    }
    setUser_gender(user_gender) {
        this.user_gender = user_gender;
    }
    setUser_email(user_email) {
        this.user_email = user_email;
    }
    setUser_number(user_number) {
        this.user_number = user_number;
    }
    setUser_address(user_address) {
        this.user_address = user_address;
    }
    setUser_avatar(user_avatar) {
        this.user_avatar = user_avatar;
    }
    setUser_active(user_active) {
        this.user_active = user_active;
    }
}
module.exports = Users