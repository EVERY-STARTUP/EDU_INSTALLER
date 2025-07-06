"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDetailStore = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = require("../../../utilities/response");
const storeModel_1 = require("../model/storeModel");
const storeSchema_1 = require("../schema/storeSchema");
const logs_1 = __importDefault(require("../../../logs"));
const requestHandler_1 = require("../../../utilities/requestHandler");
const findDetailStore = async (req, res) => {
    const { error: validationError, value: queryParams } = (0, requestHandler_1.validateRequest)(storeSchema_1.findDetailStoreSchema, req.params);
    if (validationError)
        return (0, requestHandler_1.handleValidationError)(res, validationError);
    try {
        const result = await storeModel_1.StoreModel.findOne({
            where: {
                deleted: false,
                id: queryParams.id
            }
        });
        if (result == null) {
            const message = `Store not found with ID: ${queryParams.id}`;
            logs_1.default.warn(message);
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(response_1.ResponseData.error({ message }));
        }
        const response = response_1.ResponseData.success({ data: result });
        logs_1.default.info('Store found successfully');
        return res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (serverError) {
        return (0, requestHandler_1.handleServerError)(res, serverError);
    }
};
exports.findDetailStore = findDetailStore;
