"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllQuizResult = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logs_1 = __importDefault(require("../../logs"));
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const quizResultSchema_1 = require("../../schemas/quizResultSchema");
const quizResult_1 = require("../../models/quizResult");
const quizModel_1 = require("../../models/quizModel");
const user_1 = require("../../models/user");
const findAllQuizResult = async (req, res) => {
    const requestPayload = {
        ...req.query,
        ...req.body
    };
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(quizResultSchema_1.findAllQuizResultSchema, requestPayload);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate, jwtPayload } = queryParams;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const totalQuestionsSubQuery = sequelize_1.Sequelize.literal(`(
              SELECT COUNT(*) FROM quiz_question AS questions WHERE questions.quiz_id = quiz.id
            )`);
        const result = await quizResult_1.QuizResultModel.findAndCountAll({
            where: {
                deleted: false,
                ...(jwtPayload.userRole === 'user' && {
                    userId: jwtPayload.userId
                }),
                ...(search && {
                    title: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...dateFilter
            },
            include: [
                {
                    model: quizModel_1.QuizModel,
                    as: 'quiz',
                    attributes: [
                        [totalQuestionsSubQuery, 'totalQuestions'],
                        'id',
                        'title',
                        'description',
                        'category'
                    ]
                },
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ],
            attributes: ['id', 'quizId', 'userId', 'score'],
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Quiz Result retrieved successfully');
        response.data = page.formatData(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllQuizResult = findAllQuizResult;
