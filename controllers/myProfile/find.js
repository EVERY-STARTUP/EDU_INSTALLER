"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMyProfile = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const myProfileSchema_1 = require("../../schemas/myProfileSchema");
const user_1 = require("../../models/user");
const findMyProfile = async (req, res) => {
    const { error: validationError, value: validateData } = (0, requestHandler_1.validateRequest)(myProfileSchema_1.findDetailMyProfileSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await user_1.UserModel.findOne({
            where: {
                deleted: false,
                id: validateData?.jwtPayload?.userId
            },
            attributes: ['id', 'name', 'role', 'email', 'createdAt']
        });
        if (result == null) {
            const message = `User not found`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('User found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findMyProfile = findMyProfile;
