"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.quizController = {
    findAll: findAll_1.findAllQuiz,
    findByDetail: findDetail_1.findDetailQuiz,
    create: create_1.createQuiz,
    remove: remove_1.removeQuiz,
    update: update_1.updateQuiz
};
