"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordGameScoreModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
const user_1 = require("./user");
const wordGameModel_1 = require("./wordGameModel");
exports.WordGameScoreModel = config_1.sequelize.define('WordGameScore', {
    ...baseModelFields_1.BaseModelFields,
    wordGameId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'word_game_score',
    timestamps: true,
    underscored: true
});
exports.WordGameScoreModel.belongsTo(user_1.UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
exports.WordGameScoreModel.belongsTo(wordGameModel_1.WordGameModel, {
    foreignKey: 'wordGameId',
    as: 'game'
});
