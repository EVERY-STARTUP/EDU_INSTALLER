"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStoreSchema = exports.findDetailStoreSchema = exports.deleteStoreSchema = exports.updateStoreSchema = exports.createStoreSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createStoreSchema = joi_1.default.object({
    userId: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).required(),
    description: joi_1.default.string().required(),
    icon: joi_1.default.string().uri().optional(),
    slug: joi_1.default.string().max(255).required(),
    status: joi_1.default.string().valid('active', 'inactive').required()
});
exports.updateStoreSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).optional(),
    description: joi_1.default.string().optional(),
    icon: joi_1.default.string().uri().optional(),
    slug: joi_1.default.string().max(255).optional(),
    status: joi_1.default.string().valid('active', 'inactive').optional()
});
exports.deleteStoreSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailStoreSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllStoreSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
