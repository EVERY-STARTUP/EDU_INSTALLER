"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../database/config");
const baseModelFields_1 = require("../database/baseModelFields");
exports.ModuleModel = config_1.sequelize.define('Module', {
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
    tableName: 'module',
    timestamps: true,
    underscored: true
});
