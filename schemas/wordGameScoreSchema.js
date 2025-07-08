"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllWordGameScoreSchema = exports.findDetailWordGameScoreSchema = exports.createWordGameScoreSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.createWordGameScoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema.required(),
    wordGameId: joi_1.default.number().integer().positive().required(),
    score: joi_1.default.number().integer().positive().required()
});
exports.findDetailWordGameScoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    id: joi_1.default.number().integer().required(),
    userId: joi_1.default.number().integer().positive().optional()
});
exports.findAllWordGameScoreSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional(),
    userId: joi_1.default.number().integer().positive().optional()
});
