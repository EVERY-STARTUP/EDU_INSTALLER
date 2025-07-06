"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const baseModelFields_1 = require("../database/baseModelFields");
const config_1 = require("../database/config");
exports.UserModel = config_1.sequelize.define('User', {
    ...baseModelFields_1.BaseModelFields,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    whatsappNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('superAdmin', 'admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
