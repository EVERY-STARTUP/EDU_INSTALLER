"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.appConfigs = {
    app: {
        appVersion: process.env.APP_VERSION ?? '',
        appMode: process.env.APP_MODE ?? 'development',
        env: process.env.APP_ENV,
        port: process.env.APP_PORT ?? 8000,
        log: process.env.APP_LOG === 'true'
    },
    secret: {
        passwordEncryption: process.env.PASSWORD_ENCRYPTION,
        jwtToken: process.env.JWT_TOKEN
    },
    cors: {
        origin: process.env.CORS_ORIGIN
    },
    rateLimit: {
        windowMinutes: process.env.RATE_LIMIT_WINDOW_MINUTES,
        maxRequest: process.env.RATE_LIMIT_MAX_REQUESTS
    },
    dataBase: {
        development: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true',
            port: process.env.DB_PORT
        },
        testing: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true',
            port: process.env.DB_PORT
        },
        production: {
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            logging: process.env.DB_LOG === 'true',
            port: process.env.DB_PORT
        }
    }
};
