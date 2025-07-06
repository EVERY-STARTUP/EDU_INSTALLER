"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const quizSchema_1 = require("../../schemas/quizSchema");
const quizModel_1 = require("../../models/quizModel");
const quizQuestion_1 = require("../../models/quizQuestion");
const quizOption_1 = require("../../models/quizOption");
const createQuiz = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(quizSchema_1.createQuizSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const t = await quizModel_1.QuizModel.sequelize.transaction();
    try {
        const newQuiz = await quizModel_1.QuizModel.create({
            title: validatedData.title,
            description: validatedData.description,
            category: validatedData.category
        }, { transaction: t });
        for (const item of validatedData.items) {
            const newQuestion = await quizQuestion_1.QuizQuestionModel.create({
                questionText: item.questionText,
                quizId: newQuiz.dataValues.id
            }, { transaction: t });
            const optionsToCreate = item.options.map((opt) => ({
                ...opt,
                questionId: newQuestion.id
            }));
            await quizOption_1.QuizOptionModel.bulkCreate(optionsToCreate, { transaction: t });
        }
        await t.commit();
        logs_1.default.info(`Quiz with ID ${newQuiz.id} created successfully with questions and options.`);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response_1.ResponseData.success({}));
    }
    catch (error) {
        await t.rollback();
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.createQuiz = createQuiz;
