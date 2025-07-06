"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const user_1 = require("../../models/user");
const user_2 = require("../../schemas/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const scurePassword_1 = require("../../utilities/scurePassword");
const registerUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(user_2.userRegistrationSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const existingUser = await user_1.UserModel.findOne({
            raw: true,
            where: {
                deleted: false,
                email: validatedData.email
            }
        });
        if (existingUser != null) {
            const message = `${existingUser.email} is already registered. Please use another one.`;
            logs_1.default.info(`Registration attempt failed: ${message}`);
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(response_1.ResponseData.error({ message }));
        }
        const hashedPassword = (0, scurePassword_1.hashPassword)(validatedData.password);
        const newUser = {
            ...validatedData,
            password: hashedPassword
        };
        await user_1.UserModel.create(newUser);
        logs_1.default.info(`User ${validatedData.email} registered successfully`);
        const response = response_1.ResponseData.success({ message: 'Registration successful' });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.registerUser = registerUser;
