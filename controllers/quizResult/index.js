"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizResultController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.quizResultController = {
    findAll: findAll_1.findAllQuizResult,
    findByDetail: findDetail_1.findDetailQuizResult,
    create: create_1.createQuizResult,
    remove: remove_1.removeQuizResult,
    update: update_1.updateQuizResult
};
