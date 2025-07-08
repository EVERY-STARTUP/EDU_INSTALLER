"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllWordGameScore = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const logs_1 = __importDefault(require("../../logs"));
const pagination_1 = require("../../utilities/pagination");
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const wordGameSchema_1 = require("../../schemas/wordGameSchema");
const wordGameModel_1 = require("../../models/wordGameModel");
const user_1 = require("../../models/user");
const wordGameScoreModel_1 = require("../../models/wordGameScoreModel");
const findAllWordGameScore = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(wordGameSchema_1.findAllWordGameSchema, req.query);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const { page: queryPage, size: querySize, search, pagination, startDate, endDate, userId } = queryParams;
        const page = new pagination_1.Pagination(Number(queryPage) || 0, Number(querySize) || 10);
        const dateFilter = startDate && endDate
            ? {
                createdAt: {
                    [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
            : {};
        const result = await wordGameScoreModel_1.WordGameScoreModel.findAndCountAll({
            where: {
                deleted: false,
                ...(userId && {
                    userId: userId
                }),
                ...dateFilter
            },
            include: [
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: ['id', 'name'],
                    where: {
                        ...(search && {
                            name: { [sequelize_1.Op.like]: `%${search}%` }
                        })
                    }
                },
                {
                    model: wordGameModel_1.WordGameModel,
                    as: 'game',
                    attributes: ['id', 'title']
                }
            ],
            order: [['id', 'desc']],
            ...(pagination === true && {
                limit: page.limit,
                offset: page.offset
            })
        });
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Game word score   retrieved successfully');
        response.data = page.formatData(result);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findAllWordGameScore = findAllWordGameScore;
