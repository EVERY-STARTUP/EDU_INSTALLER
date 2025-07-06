"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuzzleGameModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const gameEvaluationQuestionModel_1 = require("./gameEvaluationQuestionModel");
exports.PuzzleGameModel = config_1.sequelize.define('PuzzleGame', {
    ...baseModelFields_1.BaseModelFields,
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'puzzle_game',
    timestamps: true,
    underscored: true
});
exports.PuzzleGameModel.hasMany(gameEvaluationQuestionModel_1.GameEvaluationQuestionModel, {
    foreignKey: 'gameId',
    as: 'evaluations',
    onDelete: 'CASCADE'
});
