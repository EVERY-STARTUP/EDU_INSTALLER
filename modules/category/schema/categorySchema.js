"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllStoreSchema = exports.findDetailCategorySchema = exports.deleteCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategorySchema = joi_1.default.object({
    storeId: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).required()
});
exports.updateCategorySchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).optional()
});
exports.deleteCategorySchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailCategorySchema = joi_1.default.object({
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
