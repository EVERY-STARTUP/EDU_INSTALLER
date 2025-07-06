"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuizResult = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const quizResultSchema_1 = require("../../schemas/quizResultSchema");
const quizResult_1 = require("../../models/quizResult");
const updateQuizResult = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(quizResultSchema_1.updateQuizResultSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const [quizResultUpdated] = await quizResult_1.QuizResultModel.update(validatedData, {
            where: {
                id: validatedData.id,
                deleted: false
            }
        });
        if (quizResultUpdated === 0) {
            const message = `Quiz result not found with ID: ${validatedData.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        logs_1.default.info(`Quiz result with ID ${validatedData.id} updated successfully.`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Quiz updated successfully'
        }));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.updateQuizResult = updateQuizResult;
