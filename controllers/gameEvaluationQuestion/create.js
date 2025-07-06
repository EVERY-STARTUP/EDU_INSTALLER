"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameEvaluationQuestion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const gameEvaluationQuestionSchema_1 = require("../../schemas/gameEvaluationQuestionSchema");
const gameEvaluationQuestionModel_1 = require("../../models/gameEvaluationQuestionModel");
const createGameEvaluationQuestion = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(gameEvaluationQuestionSchema_1.createGameEvaluationQuestionSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        await gameEvaluationQuestionModel_1.GameEvaluationQuestionModel.create(validatedData);
        logs_1.default.info(`Create game evaluation question request result successfully`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createGameEvaluationQuestion = createGameEvaluationQuestion;
