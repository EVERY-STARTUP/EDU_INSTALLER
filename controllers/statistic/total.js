"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.total = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const requestHandler_1 = require("../../utilities/requestHandler");
const user_1 = require("../../models/user");
const quizModel_1 = require("../../models/quizModel");
const puzzleGameModel_1 = require("../../models/puzzleGameModel");
const moduleModel_1 = require("../../models/moduleModel");
const total = async (req, res) => {
    try {
        const totalUser = await user_1.UserModel.count({
            where: {
                deleted: 0,
                role: 'user'
            }
        });
        const totalQuiz = await quizModel_1.QuizModel.count({
            where: {
                deleted: 0
            }
        });
        const totalGame = await puzzleGameModel_1.PuzzleGameModel.count({
            where: {
                deleted: 0
            }
        });
        const totalModule = await moduleModel_1.ModuleModel.count({
            where: {
                deleted: 0
            }
        });
        const payload = {
            totalUser,
            totalModule,
            totalGame,
            totalQuiz
        };
        const response = response_1.ResponseData.success({
            data: payload
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.total = total;
