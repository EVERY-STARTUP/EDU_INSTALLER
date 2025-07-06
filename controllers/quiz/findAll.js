"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllQuiz = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logs_1 = __importDefault(require("../../logs"));
const quizModel_1 = require("../../models/quizModel");
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const quizSchema_1 = require("../../schemas/quizSchema");
const findAllQuiz = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(quizSchema_1.findAllQuizSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate, category } = queryParams;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const totalQuestionsSubQuery = sequelize_1.Sequelize.literal(`(
      SELECT COUNT(*) FROM quiz_question AS questions WHERE questions.quiz_id = Quiz.id
    )`);
        const result = await quizModel_1.QuizModel.findAndCountAll({
            where: {
                deleted: false,
                ...(search && {
                    title: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...(category && {
                    category
                }),
                ...dateFilter
            },
            attributes: {
                include: [[totalQuestionsSubQuery, 'totalQuestions']]
            },
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Quiz retrieved successfully');
        response.data = page.formatData(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllQuiz = findAllQuiz;
