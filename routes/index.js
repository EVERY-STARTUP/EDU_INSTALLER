"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouterV1 = void 0;
const routes_1 = __importDefault(require("../modules/appChek/routes"));
const routes_2 = __importDefault(require("../modules/user/routes"));
const routes_3 = __importDefault(require("../modules/product/routes"));
const routes_4 = __importDefault(require("../modules/store/routes"));
const routes_5 = __importDefault(require("../modules/category/routes"));
const appRouterV1 = (app) => {
    app.use('/api/v1', routes_1.default);
    app.use('/api/v1/users', routes_2.default);
    app.use('/api/v1/products', routes_3.default);
    app.use('/api/v1/stores', routes_4.default);
    app.use('/api/v1/categories', routes_5.default);
};
exports.appRouterV1 = appRouterV1;
