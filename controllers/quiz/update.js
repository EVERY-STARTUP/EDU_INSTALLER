"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuiz = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../utilities/response");
const logs_1 = __importDefault(require("../../logs"));
const requestHandler_1 = require("../../utilities/requestHandler");
const quizSchema_1 = require("../../schemas/quizSchema");
const quizModel_1 = require("../../models/quizModel");
const quizQuestion_1 = require("../../models/quizQuestion");
const quizOption_1 = require("../../models/quizOption");
const updateQuiz = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(quizSchema_1.updateQuizSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    const t = await quizModel_1.QuizModel.sequelize.transaction();
    try {
        const [quizUpdateCount] = await quizModel_1.QuizModel.update({
            title: validatedData.title,
            description: validatedData.description
        }, {
            where: { id: validatedData.id, deleted: false },
            transaction: t
        });
        if (quizUpdateCount === 0) {
            const message = `Quiz not found with ID: ${validatedData.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        if (validatedData.items?.length > 0) {
            for (const item of validatedData.items) {
                if (item.id) {
                    const [questionUpdateCount] = await quizQuestion_1.QuizQuestionModel.update({
                        questionText: item.questionText
                    }, {
                        where: { id: item.id },
                        transaction: t
                    });
                    if (questionUpdateCount === 0) {
                        throw new Error(`Question not found with ID: ${item.id}`);
                    }
                    if (item.options?.length > 0) {
                        for (const opt of item.options) {
                            if (opt.id) {
                                const [optionUpdateCount] = await quizOption_1.QuizOptionModel.update({
                                    optionText: opt.optionText,
                                    isCorrect: opt.isCorrect
                                }, {
                                    where: { id: opt.id },
                                    transaction: t
                                });
                                if (optionUpdateCount === 0) {
                                    throw new Error(`Option not found with ID: ${opt.id}`);
                                }
                            }
                            else {
                                await quizOption_1.QuizOptionModel.create({
                                    ...opt,
                                    questionId: item.id
                                }, { transaction: t });
                            }
                        }
                    }
                }
                else {
                    const newQuestion = await quizQuestion_1.QuizQuestionModel.create({
                        questionText: item.questionText,
                        quizId: validatedData.id
                    }, { transaction: t });
                    if (item.options?.length > 0) {
                        const optionsToCreate = item.options.map((opt) => ({
                            ...opt,
                            questionId: newQuestion.id
                        }));
                        await quizOption_1.QuizOptionModel.bulkCreate(optionsToCreate, { transaction: t });
                    }
                }
            }
        }
        await t.commit();
        logs_1.default.info(`Quiz with ID ${validatedData.id} updated successfully.`);
        return res.status(http_status_codes_1.StatusCodes.OK).json(response_1.ResponseData.success({
            message: 'Quiz updated successfully',
            data: { quizId: validatedData.id }
        }));
    }
    catch (error) {
        await t.rollback();
        return (0, requestHandler_1.handleServerError)(res, error);
    }
};
exports.updateQuiz = updateQuiz;
