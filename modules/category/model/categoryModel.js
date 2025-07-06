"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../database/config");
const baseModelFields_1 = require("../../../database/baseModelFields");
exports.CategoryModel = config_1.sequelize.define('Category', {
    ...baseModelFields_1.BaseModelFields,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    storeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'store',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'category',
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
});
