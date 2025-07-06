"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const quizQuestion_1 = require("./quizQuestion");
exports.QuizModel = config_1.sequelize.define('Quiz', {
    ...baseModelFields_1.BaseModelFields,
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('general', 'personal'),
        allowNull: false
    }
}, {
    tableName: 'quiz',
    timestamps: true,
    underscored: true
});
exports.QuizModel.hasMany(quizQuestion_1.QuizQuestionModel, {
    foreignKey: 'quizId',
    as: 'questions',
    onDelete: 'CASCADE'
});
