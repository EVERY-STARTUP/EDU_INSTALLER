"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = exports.findDetailUserSchema = exports.findAllUsersSchema = exports.userRegistrationSchema = exports.userLoginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userLoginSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.userRegistrationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    whatsappNumber: joi_1.default.string().optional().allow(''),
    email: joi_1.default.string().required(),
    role: joi_1.default.string().valid('superAdmin', 'admin', 'user').required(),
    password: joi_1.default.string().min(6).required()
});
exports.findAllUsersSchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(0).default(0).optional(),
    size: joi_1.default.number().integer().min(1).default(10).optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().default(true).optional()
});
exports.findDetailUserSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
exports.userSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    whatsappNumber: joi_1.default.string().required(),
    name: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(6).max(128).required(),
    role: joi_1.default.string().valid('superAdmin', 'admin', 'user').required()
});
exports.updateUserSchema = joi_1.default.object({
    id: joi_1.default.string().required(),
    whatsappNumber: joi_1.default.string().optional(),
    name: joi_1.default.string().min(3).max(30).optional(),
    password: joi_1.default.string().min(6).max(128).optional(),
    role: joi_1.default.string().valid('superAdmin', 'admin', 'user').optional()
});
