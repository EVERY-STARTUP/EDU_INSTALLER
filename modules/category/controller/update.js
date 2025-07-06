"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const categoryModel_1 = require("../model/categoryModel");
const categorySchema_1 = require("../schema/categorySchema");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const updateCategory = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(categorySchema_1.updateCategorySchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const [updated] = await categoryModel_1.CategoryModel.update(validatedData, {
            where: { deleted: false, id: validatedData.id }
        });
        if (updated === 0) {
            const message = `Category not found with ID: ${validatedData.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({});
        logs_1.default.info('Category updated successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateCategory = updateCategory;
