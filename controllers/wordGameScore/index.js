"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordGameScoreController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
exports.wordGameScoreController = {
    findAll: findAll_1.findAllWordGameScore,
    findDetail: findDetail_1.findDetailWordGameScore,
    create: create_1.createWordGameScore
};
