"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGameEvaluationQuestion = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const gameEvaluationQuestionSchema_1 = require("../../schemas/gameEvaluationQuestionSchema");
const gameEvaluationQuestionModel_1 = require("../../models/gameEvaluationQuestionModel");
const updateGameEvaluationQuestion = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(gameEvaluationQuestionSchema_1.updateGameEvaluationQuestionSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const [gameEvaluationQuestionUpdated] = await gameEvaluationQuestionModel_1.GameEvaluationQuestionModel.update(validatedData, {
            where: {
                id: validatedData.id,
                deleted: false
            }
        });
        if (gameEvaluationQuestionUpdated === 0) {
            const message = `Game evaluation question result not found with ID: ${validatedData.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        logs_1.default.info(`Game evaluation question result with ID ${validatedData.id} updated successfully.`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Game evaluation question updated successfully'
        }));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.updateGameEvaluationQuestion = updateGameEvaluationQuestion;
