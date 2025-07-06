"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puzzleGameController = void 0;
const create_1 = require("./create");
const findAll_1 = require("./findAll");
const findDetail_1 = require("./findDetail");
const remove_1 = require("./remove");
const update_1 = require("./update");
exports.puzzleGameController = {
    findAll: findAll_1.findAllPuzzleGame,
    findByDetail: findDetail_1.findDetailPuzzleGame,
    create: create_1.createPuzzleGame,
    remove: remove_1.removePuzzleGame,
    update: update_1.updatePuzzleGame
};
