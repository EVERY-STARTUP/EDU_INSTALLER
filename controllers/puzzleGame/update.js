"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePuzzleGame = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const puzzleGameSchema_1 = require("../../schemas/puzzleGameSchema");
const puzzleGameModel_1 = require("../../models/puzzleGameModel");
const gameEvaluationQuestionModel_1 = require("../../models/gameEvaluationQuestionModel"); // Asumsikan model ini ada
const updatePuzzleGame = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(puzzleGameSchema_1.updatePuzzleGameSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const t = await puzzleGameModel_1.PuzzleGameModel.sequelize.transaction();
    try {
        const [quizResultUpdated] = await puzzleGameModel_1.PuzzleGameModel.update({
            title: validatedData.title,
            description: validatedData.description,
            image: validatedData.image
        }, {
            where: {
                id: validatedData.id,
                deleted: false
            },
            transaction: t
        });
        if (quizResultUpdated === 0) {
            const message = `Puzzle game result not found with ID: ${validatedData.id}`;
            logs_1.default.warn(message);
            await t.rollback(); // Pastikan rollback jika game tidak ditemukan
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        // Handle evaluations if they exist in the request
        if (validatedData.gameEvaluationQuestion &&
            validatedData.gameEvaluationQuestion.length > 0) {
            for (const evaluation of validatedData.gameEvaluationQuestion) {
                if (evaluation.id) {
                    const [evaluationUpdateCount] = await gameEvaluationQuestionModel_1.GameEvaluationQuestionModel.update({
                        question: evaluation.question,
                        key: evaluation.key
                    }, {
                        where: {
                            id: evaluation.id,
                            gameId: validatedData.id
                        },
                        transaction: t
                    });
                }
                else {
                    await gameEvaluationQuestionModel_1.GameEvaluationQuestionModel.create({
                        gameId: validatedData.id,
                        question: evaluation.question,
                        key: evaluation.key,
                        category: 'puzzle'
                    }, { transaction: t });
                }
            }
        }
        await t.commit();
        logs_1.default.info(`Puzzle game result with ID ${validatedData.id} updated successfully.`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Puzzle game updated successfully'
        }));
    }
    catch (error) {
        await t.rollback();
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.updatePuzzleGame = updatePuzzleGame;
