"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStore = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const storeModel_1 = require("../model/storeModel");
const storeSchema_1 = require("../schema/storeSchema");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const createStore = async (req, res) => {
    const { error: validationError, value: validatedData } = (0, requestHandler_1.validateRequest)(storeSchema_1.createStoreSchema, req.body);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const existingStore = await storeModel_1.StoreModel.findOne({
            where: { slug: validatedData.slug }
        });
        if (existingStore) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json(response_1.ResponseData.error({
                message: 'Slug already in use. Please choose a different name.'
            }));
        }
        const result = await storeModel_1.StoreModel.create(validatedData);
        logs_1.default.info('Store created successfully');
        const response = response_1.ResponseData.success({ data: result });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.createStore = createStore;
