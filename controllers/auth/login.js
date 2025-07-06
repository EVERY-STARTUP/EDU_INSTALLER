"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const user_1 = require("../../models/user");
const user_2 = require("../../schemas/user");
const jwt_1 = require("../../utilities/jwt");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const scurePassword_1 = require("../../utilities/scurePassword");
const loginUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(user_2.userLoginSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const user = await user_1.UserModel.findOne({
            where: { deleted: false, email: validatedData.email }
        });
        if (user == null) {
            const message = 'Account not found. Please register first!';
            logs_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const isPasswordValid = (0, scurePassword_1.hashPassword)(validatedData.password) === user.password;
        if (!isPasswordValid) {
            const message = 'Invalid password combination!';
            logs_1.default.info(`Login attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(response_1.ResponseData.error({ message }));
        }
        const token = (0, jwt_1.generateAccessToken)({ userId: user.id, userRole: user.role });
        logs_1.default.info(`User ${validatedData.email} logged in successfully`);
        const response = response_1.ResponseData.success({ data: { token } });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.loginUser = loginUser;
