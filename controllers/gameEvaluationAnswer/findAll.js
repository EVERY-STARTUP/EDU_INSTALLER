"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllGameEvaluationAnswer = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logs_1 = __importDefault(require("../../logs"));
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const gameEvaluationAnswerSchema_1 = require("../../schemas/gameEvaluationAnswerSchema");
const gameEvaluationAnswerModel_1 = require("../../models/gameEvaluationAnswerModel");
const gameEvaluationQuestionModel_1 = require("../../models/gameEvaluationQuestionModel");
const user_1 = require("../../models/user");
const puzzleGameModel_1 = require("../../models/puzzleGameModel");
const findAllGameEvaluationAnswer = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(gameEvaluationAnswerSchema_1.findAllGameEvaluationAnswerSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate } = queryParams;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await gameEvaluationAnswerModel_1.GameEvaluationAnswerModel.findAndCountAll({
            where: {
                deleted: false,
                ...(search && {
                    answer: { [sequelize_1.Op.like]: `%${search}%` }
                }),
                ...dateFilter
            },
            include: [
                {
                    model: gameEvaluationQuestionModel_1.GameEvaluationQuestionModel,
                    as: 'question',
                    attributes: ['question']
                },
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: ['name']
                },
                {
                    model: puzzleGameModel_1.PuzzleGameModel,
                    as: 'game'
                }
            ],
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Game evaluation answer  retrieved successfully');
        response.data = page.formatData(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllGameEvaluationAnswer = findAllGameEvaluationAnswer;
