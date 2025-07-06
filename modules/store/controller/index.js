"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeControllers = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.storeControllers = {
    findAll: findAll_1.findAllStore,
    findDetail: findDetail_1.findDetailStore,
    create: create_1.createStore,
    update: update_1.updateStore,
    remove: remove_1.removeStore
};
