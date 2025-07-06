"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllGameEvaluationQuestionSchema = exports.findDetailGameEvaluationQuestionSchema = exports.deleteGameEvaluationQuestionSchema = exports.updateGameEvaluationQuestionSchema = exports.createGameEvaluationQuestionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createGameEvaluationQuestionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    question: joi_1.default.string().required(),
    gameId: joi_1.default.number().required(),
    category: joi_1.default.string().valid('puzzle', 'word').default('puzzle').required()
});
exports.updateGameEvaluationQuestionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required(),
    question: joi_1.default.string().optional(),
    gameId: joi_1.default.number().optional(),
    category: joi_1.default.string().valid('puzzle', 'word').default('puzzle').optional()
});
exports.deleteGameEvaluationQuestionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailGameEvaluationQuestionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllGameEvaluationQuestionSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
