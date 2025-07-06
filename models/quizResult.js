"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizResultModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const quizModel_1 = require("./quizModel");
const user_1 = require("./user");
exports.QuizResultModel = config_1.sequelize.define('QuizResult', {
    ...baseModelFields_1.BaseModelFields,
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quizId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'quiz',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'quiz_result',
    timestamps: false,
    paranoid: true,
    underscored: true
});
exports.QuizResultModel.belongsTo(quizModel_1.QuizModel, {
    foreignKey: 'quizId',
    as: 'quiz'
});
exports.QuizResultModel.belongsTo(user_1.UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
