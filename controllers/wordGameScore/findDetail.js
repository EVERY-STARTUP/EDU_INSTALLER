"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailWordGameScore = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const wordGameSchema_1 = require("../../schemas/wordGameSchema");
const wordGameScoreModel_1 = require("../../models/wordGameScoreModel");
const user_1 = require("../../models/user");
const wordGameModel_1 = require("../../models/wordGameModel");
const findDetailWordGameScore = async (req, res) => {
    const { error: validationError, value: validateData } = (0, requestHandler_1.validateRequest)(wordGameSchema_1.findDetailWordGameSchema, { ...req.params, ...req.query });
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await wordGameScoreModel_1.WordGameScoreModel.findOne({
            where: {
                deleted: false,
                id: validateData.id,
                ...(validateData.userId && {
                    userId: validateData.userId
                })
            },
            include: [
                {
                    model: user_1.UserModel,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: wordGameModel_1.WordGameModel,
                    as: 'game',
                    attributes: ['id', 'title']
                }
            ]
        });
        if (result == null) {
            const message = `Word game score not found with ID: ${validateData.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('word game score found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailWordGameScore = findDetailWordGameScore;
