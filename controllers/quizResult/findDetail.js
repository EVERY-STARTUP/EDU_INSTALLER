"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailQuizResult = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const quizResultSchema_1 = require("../../schemas/quizResultSchema");
const quizResult_1 = require("../../models/quizResult");
const quizModel_1 = require("../../models/quizModel");
const findDetailQuizResult = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(quizResultSchema_1.findDetailQuizResultSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await quizResult_1.QuizResultModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            },
            include: [
                {
                    model: quizModel_1.QuizModel,
                    as: 'quiz',
                    attributes: ['id', 'title', 'description', 'category']
                }
            ],
            attributes: ['id', 'quizId', 'userId', 'score']
        });
        if (result == null) {
            const message = `Quiz result not found with ID: ${queryParams.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Quiz result found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailQuizResult = findDetailQuizResult;
