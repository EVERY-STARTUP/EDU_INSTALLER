"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Welcome to Eduapp Documentations',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    tags: [
        {
            name: 'APP',
            description: 'App-related endpoints'
        },
        {
            name: 'USERS',
            description: 'User-related endpoints'
        },
        {
            name: 'QUIZZES',
            description: 'quiz-related endpoints'
        },
        {
            name: 'AUTH',
            description: 'auth-related endpoints'
        }
    ],
    apis: ['./src/docs/*.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
