"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWordGameScore = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const wordGameScoreSchema_1 = require("../../schemas/wordGameScoreSchema");
const wordGameScoreModel_1 = require("../../models/wordGameScoreModel");
const createWordGameScore = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(wordGameScoreSchema_1.createWordGameScoreSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        validatedData.userId = validatedData.jwtPayload.userId;
        await wordGameScoreModel_1.WordGameScoreModel.create(validatedData);
        logs_1.default.info(`Create word game score successfully`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createWordGameScore = createWordGameScore;
