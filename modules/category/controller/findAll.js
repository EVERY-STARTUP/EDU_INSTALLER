"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllCategory = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const categoryModel_1 = require("../model/categoryModel");
const categorySchema_1 = require("../schema/categorySchema");
const logs_1 = __importDefault(require("../../../logs"));
const pagination_1 = require("../../../utilities/pagination");
const sequelize_1 = require("sequelize");
const requestHandler_1 = require("../../../utilities/requestHandler");
const findAllCategory = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(categorySchema_1.findAllStoreSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate } = queryParams;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await categoryModel_1.CategoryModel.findAndCountAll({
            where: {
                deleted: false,
                ...(search && {
                    name: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...dateFilter
            },
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Cagtegory retrieved successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllCategory = findAllCategory;
