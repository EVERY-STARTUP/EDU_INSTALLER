"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEvaluationAnswerModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const gameEvaluationQuestionModel_1 = require("./gameEvaluationQuestionModel");
const user_1 = require("./user");
const puzzleGameModel_1 = require("./puzzleGameModel");
exports.GameEvaluationAnswerModel = config_1.sequelize.define('GameEvelutaionAnswer', {
    ...baseModelFields_1.BaseModelFields,
    answer: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    gameId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('puzzle', 'word'),
        allowNull: true,
        defaultValue: 'puzzle'
    }
}, {
    tableName: 'game_evaluation_answer',
    timestamps: true,
    underscored: true
});
exports.GameEvaluationAnswerModel.belongsTo(gameEvaluationQuestionModel_1.GameEvaluationQuestionModel, {
    foreignKey: 'questionId',
    as: 'question'
});
exports.GameEvaluationAnswerModel.belongsTo(user_1.UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
exports.GameEvaluationAnswerModel.belongsTo(puzzleGameModel_1.PuzzleGameModel, {
    foreignKey: 'gameId',
    as: 'game'
});
