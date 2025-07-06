"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const access_1 = require("./access");
const requestTimer_1 = require("./requestTimer");
const roleGuard_1 = require("./roleGuard");
exports.middleware = { useAuthorization: access_1.useAuthorization, requestTimer: requestTimer_1.requestTimer, allowRoles: roleGuard_1.allowRoles };
