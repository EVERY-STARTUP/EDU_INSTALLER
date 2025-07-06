"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailQuiz = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const quizModel_1 = require("../../models/quizModel");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const quizSchema_1 = require("../../schemas/quizSchema");
const quizOption_1 = require("../../models/quizOption");
const quizQuestion_1 = require("../../models/quizQuestion");
const findDetailQuiz = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(quizSchema_1.findDetailQuizSchema, { ...req.params, ...req.query });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await quizModel_1.QuizModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            },
            include: [
                {
                    model: quizQuestion_1.QuizQuestionModel,
                    as: 'questions',
                    attributes: ['questionText', 'id', 'quizId'],
                    include: [
                        {
                            model: quizOption_1.QuizOptionModel,
                            as: 'options',
                            attributes: ['optionText', 'id', 'questionId', 'isCorrect']
                        }
                    ]
                }
            ]
        });
        if (result == null) {
            const message = `Quiz not found with ID: ${queryParams.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Quiz found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailQuiz = findDetailQuiz;
