"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWordGame = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const wordGameSchema_1 = require("../../schemas/wordGameSchema");
const wordGameModel_1 = require("../../models/wordGameModel");
const createWordGame = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(wordGameSchema_1.createWordGameSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        await wordGameModel_1.WordGameModel.create(validatedData);
        logs_1.default.info(`Create word game successfully`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createWordGame = createWordGame;
