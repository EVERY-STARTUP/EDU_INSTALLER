"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameEvaluationAnswer = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const gameEvaluationAnswerModel_1 = require("../../models/gameEvaluationAnswerModel");
const gameEvaluationAnswerSchema_1 = require("../../schemas/gameEvaluationAnswerSchema");
const createGameEvaluationAnswer = async (req, res) => {
    console.log(req.body);
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(gameEvaluationAnswerSchema_1.createManyGameEvaluationAnswerSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const payload = validatedData?.answers.map((item) => {
            return {
                ...item,
                userId: req.body.jwtPayload.userId
            };
        });
        await gameEvaluationAnswerModel_1.GameEvaluationAnswerModel.bulkCreate(payload);
        logs_1.default.info(`Create game evaluation answer request result successfully`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createGameEvaluationAnswer = createGameEvaluationAnswer;
