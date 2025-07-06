"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProductSchema = exports.findDetailProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    storeId: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().uri().optional(),
    basePrice: joi_1.default.number().positive().required(),
    sellingPrice: joi_1.default.number().positive().required(),
    stock: joi_1.default.number().integer().min(0).required(),
    status: joi_1.default.string().valid('active', 'inactive').required(),
    categoryId: joi_1.default.number().integer().positive().optional()
});
exports.updateProductSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required(),
    name: joi_1.default.string().max(255).optional(),
    description: joi_1.default.string().optional(),
    image: joi_1.default.string().uri().optional(),
    basePrice: joi_1.default.number().positive().optional(),
    sellingPrice: joi_1.default.number().positive().optional(),
    stock: joi_1.default.number().integer().min(0).optional(),
    status: joi_1.default.string().valid('active', 'inactive').optional(),
    categoryId: joi_1.default.number().integer().positive().optional()
});
exports.deleteProductSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required()
});
exports.findDetailProductSchema = joi_1.default.object({
    id: joi_1.default.number().integer().positive().required()
});
exports.findAllProductSchema = joi_1.default.object({
    page: joi_1.default.number().integer().optional(),
    size: joi_1.default.number().integer().optional(),
    search: joi_1.default.string().allow('').optional(),
    pagination: joi_1.default.boolean().optional(),
    startDate: joi_1.default.string().allow('').optional(),
    endDate: joi_1.default.string().allow('').optional()
});
