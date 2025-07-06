"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const response_1 = require("../../../utilities/response");
const user_1 = require("../model/user");
const pagination_1 = require("../../../utilities/pagination");
const user_2 = require("../schema/user");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const findAllUser = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(user_2.findAllUsersSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const { page: queryPage, size: querySize, search, pagination } = queryParams;
    try {
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const result = await user_1.UserModel.findAndCountAll({
            where: {
                deleted: false,
                ...(Boolean(search) && {
                    [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.like]: `%${search}%` } }]
                })
            },
            attributes: ['id', 'name', 'role', 'createdAt', 'updatedAt'],
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        response.data = page.formatData(result);
        logs_1.default.info('Fetched all users successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllUser = findAllUser;
