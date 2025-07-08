"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordGameModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.WordGameModel = config_1.sequelize.define('WordGame', {
    ...baseModelFields_1.BaseModelFields,
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    tableName: 'word_game',
    timestamps: true,
    underscored: true
});
