"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameEvaluationAnswerController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
exports.gameEvaluationAnswerController = {
    findAll: findAll_1.findAllGameEvaluationAnswer,
    findByDetail: findDetail_1.findDetailGameEvaluationAnswer,
    create: create_1.createGameEvaluationAnswer
};
