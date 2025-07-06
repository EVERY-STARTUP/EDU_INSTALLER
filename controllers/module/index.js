"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.moduleController = {
    findAll: findAll_1.findAllModule,
    findByDetail: findDetail_1.findDetailModule,
    create: create_1.createModule,
    remove: remove_1.removeModule,
    update: update_1.updateModule
};
