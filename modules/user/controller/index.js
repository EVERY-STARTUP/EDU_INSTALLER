"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const login_1 = require("./login");
const register_1 = require("./register");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.UsersController = {
    loginUser: login_1.loginUser,
    registerUser: register_1.registerUser,
    findAllUser: findAll_1.findAllUser,
    findDetailUser: findDetail_1.findDetailUser,
    updateUser: update_1.updateUser,
    removeUser: remove_1.removeUser
};
