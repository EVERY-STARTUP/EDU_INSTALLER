"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPuzzleGame = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../database/config");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const puzzleGameSchema_1 = require("../../schemas/puzzleGameSchema");
const puzzleGameModel_1 = require("../../models/puzzleGameModel");
const gameEvaluationQuestionModel_1 = require("../../models/gameEvaluationQuestionModel");
const createPuzzleGame = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(puzzleGameSchema_1.createPuzzleGameSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const transaction = await config_1.sequelize.transaction();
    try {
        const puzzleGame = await puzzleGameModel_1.PuzzleGameModel.create(validatedData, {
            transaction
        });
        if (validatedData.gameEvaluationQuestion?.length > 0) {
            const questionPayload = validatedData.gameEvaluationQuestion.map((q) => ({
                question: q.question,
                gameId: puzzleGame.id,
                category: q.category || 'puzzle'
            }));
            await gameEvaluationQuestionModel_1.GameEvaluationQuestionModel.bulkCreate(questionPayload, {
                transaction
            });
        }
        await transaction.commit();
        logs_1.default.info(`Create puzzle game request successfully`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        await transaction.rollback();
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createPuzzleGame = createPuzzleGame;
