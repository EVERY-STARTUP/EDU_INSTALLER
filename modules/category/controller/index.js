"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.categoryControllers = {
    findAll: findAll_1.findAllCategory,
    findDetail: findDetail_1.findDetailCategory,
    create: create_1.createCategory,
    update: update_1.updateCategory,
    remove: remove_1.removeCategory
};
