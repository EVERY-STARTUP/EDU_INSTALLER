"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const myProfile_1 = require("../controllers/myProfile");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await myProfile_1.myProfileController.findMyProfile(req, res));
exports.default = router;
