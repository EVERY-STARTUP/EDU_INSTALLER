"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const categoryModel_1 = require("../model/categoryModel");
const categorySchema_1 = require("../schema/categorySchema");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const createCategory = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(categorySchema_1.createCategorySchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const existingStore = await categoryModel_1.CategoryModel.findOne({
            where: { name: validatedData.name }
        });
        if (existingStore) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error({
                message: 'Category already in use. Please choose a different name.'
            }));
        }
        const result = await categoryModel_1.CategoryModel.create(validatedData);
        logs_1.default.info('Category created successfully');
        const response = response_1.ResponseData.success({ data: result });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createCategory = createCategory;
