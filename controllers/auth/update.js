"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const user_1 = require("../../models/user");
const user_2 = require("../../schemas/user");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const scurePassword_1 = require("../../utilities/scurePassword");
const updateUser = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(user_2.updateUserSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const user = await user_1.UserModel.findOne({
            where: {
                deleted: false,
                id: validatedData.id
            }
        });
        if (user == null) {
            const message = 'User not found!';
            logs_1.default.info(`Attempt to update non-existing user: ${validatedData.id}`);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const { name, email, whatsappNumber, password, role } = validatedData;
        const updatedData = {
            ...(name?.length ? { name } : {}),
            ...(email?.length ? { email } : {}),
            ...(whatsappNumber?.length ? { whatsappNumber } : {}),
            ...(password?.length ? { password: (0, scurePassword_1.hashPassword)(password) } : {}),
            ...(role?.length ? { role } : {})
        };
        await user_1.UserModel.update(updatedData, {
            where: {
                deleted: false,
                id: validatedData.id
            }
        });
        logs_1.default.info(`User ${validatedData.id} updated successfully`);
        const response = response_1.ResponseData.success({ message: 'User updated successfully' });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.updateUser = updateUser;
