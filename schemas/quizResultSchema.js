"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllQuizResultSchema = exports.findDetailQuizResultSchema = exports.deleteQuizResultSchema = exports.updateQuizResultSchema = exports.createQuizResultSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createQuizResultSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    quizId: joi_1.default.number().integer().positive().required(),
    score: joi_1.default.number().integer().optional()
});
exports.updateQuizResultSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required(),
    quizId: joi_1.default.number().integer().positive().optional(),
    score: joi_1.default.number().integer().optional()
});
exports.deleteQuizResultSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailQuizResultSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllQuizResultSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
