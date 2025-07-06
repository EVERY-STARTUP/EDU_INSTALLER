"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestionModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const quizOption_1 = require("./quizOption");
exports.QuizQuestionModel = config_1.sequelize.define('QuizQuestion', {
    ...baseModelFields_1.BaseModelFields,
    questionText: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    quizId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'quiz',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'quiz_question',
    timestamps: false,
    underscored: true,
    freezeTableName: true
});
exports.QuizQuestionModel.hasMany(quizOption_1.QuizOptionModel, {
    foreignKey: 'questionId',
    as: 'options',
    onDelete: 'CASCADE'
});
