"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameEvaluationQuestionController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.gameEvaluationQuestionController = {
    findAll: findAll_1.findAllGameEvaluationQuestion,
    findByDetail: findDetail_1.findDetailGameEvaluationQuestion,
    create: create_1.createGameEvaluationQuestion,
    remove: remove_1.removeGameEvaluationQuestion,
    update: update_1.updateGameEvaluationQuestion
};
