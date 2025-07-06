"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQuiz = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const quizModel_1 = require("../../models/quizModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const quizSchema_1 = require("../../schemas/quizSchema");
const removeQuiz = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(quizSchema_1.deleteQuizSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await quizModel_1.QuizModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            }
        });
        console.log('-----sds');
        if (result == null) {
            const message = `Quiz not found with ID: ${queryParams.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        await result.destroy();
        const response = response_1.ResponseData.success({ message: 'Quiz deleted successfully' });
        logs_1.default.info('Quiz deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removeQuiz = removeQuiz;
