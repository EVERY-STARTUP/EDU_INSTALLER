"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../../database/config");
const baseModelFields_1 = require("../../../database/baseModelFields");
exports.StoreModel = config_1.sequelize.define('Store', {
    ...baseModelFields_1.BaseModelFields,
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    icon: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'store',
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
});
