"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileSchema = exports.findDetailMyProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jwtPayloadSchema_1 = require("./jwtPayloadSchema");
exports.findDetailMyProfileSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema
});
exports.updateMyProfileSchema = joi_1.default.object({
    jwtPayload: jwtPayloadSchema_1.jwtPayloadSchema,
    name: joi_1.default.string().allow('').min(3).max(30).optional(),
    password: joi_1.default.string().allow('').min(6).max(128).optional(),
    email: joi_1.default.string().allow('').min(6).max(128).optional(),
    role: joi_1.default.string().allow('').valid('admin', 'superAdmin', 'user').optional().optional()
});
