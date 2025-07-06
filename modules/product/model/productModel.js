"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../database/config");
const baseModelFields_1 = require("../../../database/baseModelFields");
exports.ProductModel = config_1.sequelize.define('Product', {
    ...baseModelFields_1.BaseModelFields,
    storeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    basePrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    sellingPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'product',
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
});
