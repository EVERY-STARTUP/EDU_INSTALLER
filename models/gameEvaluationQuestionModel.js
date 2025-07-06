"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEvaluationQuestionModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.GameEvaluationQuestionModel = config_1.sequelize.define('GameEvelutaionQuestion', {
    ...baseModelFields_1.BaseModelFields,
    question: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    gameId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('puzzle', 'word'),
        allowNull: true,
        defaultValue: 'puzzle'
    }
}, {
    tableName: 'game_evaluation_question',
    timestamps: true,
    underscored: true
});
