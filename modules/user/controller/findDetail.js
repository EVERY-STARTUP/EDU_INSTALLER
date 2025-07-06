"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const user_1 = require("../model/user");
const user_2 = require("../schema/user");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const findDetailUser = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(user_2.findDetailUserSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await user_1.UserModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            },
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });
        if (result == null) {
            const message = 'User not found!';
            logs_1.default.info(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info(`Fetched user with ID: ${queryParams.id} successfully`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailUser = findDetailUser;
