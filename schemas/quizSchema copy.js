"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllQuizSchema = exports.findDetailQuizSchema = exports.deleteQuizSchema = exports.updateQuizSchema = exports.updateQuizQuestionSchema = exports.updateQuizOptionSchema = exports.createQuizSchema = exports.quizQuestionSchema = exports.quizOptionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.quizOptionSchema = joi_1.default.object({
    optionText: joi_1.default.string().required(),
    isCorrect: joi_1.default.boolean().required()
});
exports.quizQuestionSchema = joi_1.default.object({
    questionText: joi_1.default.string().required(),
    options: joi_1.default.array().items(exports.quizOptionSchema).min(1).required()
});
exports.createQuizSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    category: joi_1.default.string().valid('personal', 'general').default('personal').required(),
    items: joi_1.default.array().items(exports.quizQuestionSchema).required().min(1).required()
});
exports.updateQuizOptionSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().optional(),
    optionText: joi_1.default.string().required(),
    isCorrect: joi_1.default.boolean().required()
});
exports.updateQuizQuestionSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().optional(),
    questionText: joi_1.default.string().required(),
    options: joi_1.default.array().items(exports.updateQuizOptionSchema).min(1).required()
});
exports.updateQuizSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required(),
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    items: joi_1.default.array().items(exports.updateQuizQuestionSchema).required().min(1).optional()
});
exports.deleteQuizSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailQuizSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().positive().required(),
    category: joi_1.default.string().valid('personal', 'general').default('personal').required()
});
exports.findAllQuizSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional(),
    category: joi_1.default.string().valid('personal', 'general').default('personal').required()
});
