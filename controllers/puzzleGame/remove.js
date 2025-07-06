"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePuzzleGame = void 0;
const http_status_codes_1 = require("http-status-codes");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const response_1 = require("../../utilities/response");
const puzzleGameSchema_1 = require("../../schemas/puzzleGameSchema");
const puzzleGameModel_1 = require("../../models/puzzleGameModel");
const removePuzzleGame = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(puzzleGameSchema_1.deletePuzzleGameSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await puzzleGameModel_1.PuzzleGameModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            }
        });
        if (result == null) {
            const message = `Puzzle gmae result not found with ID: ${queryParams.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        await result.destroy();
        const response = response_1.ResponseData.success({
            message: 'Puzzle game result deleted successfully'
        });
        logs_1.default.info('Puzzle game result deleted successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.removePuzzleGame = removePuzzleGame;
