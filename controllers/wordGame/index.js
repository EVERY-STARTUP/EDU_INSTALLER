"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordGameController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
exports.wordGameController = {
    findAll: findAll_1.findAllWordGame,
    findByDetail: findDetail_1.findDetailWordGame,
    create: create_1.createWordGame,
    remove: remove_1.removeWordGame
};
