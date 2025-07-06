"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.usersController = {
    findAll: findAll_1.findAllUser,
    findDetail: findDetail_1.findDetailUser,
    update: update_1.updateUser,
    remove: remove_1.removeUser
};
