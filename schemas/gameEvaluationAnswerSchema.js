"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllGameEvaluationAnswerSchema = exports.findDetailGameEvaluationAnswerSchema = exports.createManyGameEvaluationAnswerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
const singleAnswerSchema = joi_1.default.object({
    answer: joi_1.default.string().required(),
    gameId: joi_1.default.number().required(),
    questionId: joi_1.default.number().required(),
    category: joi_1.default.string().valid('puzzle', 'word').required()
});
exports.createManyGameEvaluationAnswerSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema.required(),
    answers: joi_1.default.array().items(singleAnswerSchema).min(1).required()
});
exports.findDetailGameEvaluationAnswerSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllGameEvaluationAnswerSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
