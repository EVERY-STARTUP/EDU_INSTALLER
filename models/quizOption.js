"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizOptionModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.QuizOptionModel = config_1.sequelize.define('QuizOption', {
    ...baseModelFields_1.BaseModelFields,
    optionText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isCorrect: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'quiz_question',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'quiz_option',
    timestamps: false,
    underscored: true
});
