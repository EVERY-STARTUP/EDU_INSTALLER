"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPuzzleGameSchema = exports.findDetailPuzzleGameSchema = exports.deletePuzzleGameSchema = exports.updatePuzzleGameSchema = exports.createPuzzleGameSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
const gameEvaluationQuestionItemSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().optional(),
    gameId: joi_1.default.number().integer().positive().optional(),
    question: joi_1.default.string().required(),
    category: joi_1.default.string().valid('puzzle', 'word').default('puzzle')
});
exports.createPuzzleGameSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().optional(),
    gameEvaluationQuestion: joi_1.default.array().items(gameEvaluationQuestionItemSchema).optional()
});
exports.updatePuzzleGameSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required(),
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    image: joi_1.default.string().optional(),
    gameEvaluationQuestion: joi_1.default.array().items(gameEvaluationQuestionItemSchema).optional()
});
exports.deletePuzzleGameSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailPuzzleGameSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllPuzzleGameSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
