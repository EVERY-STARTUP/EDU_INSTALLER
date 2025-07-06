"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const controller_1 = require("./controller");
const middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.middleware.useAuthorization, async (req, res) => await controller_1.UsersController.findAllUser(req, res));
router.get('/detail/:userId', middlewares_1.middleware.useAuthorization, async (req, res) => await controller_1.UsersController.findDetailUser(req, res));
router.patch('/', async (req, res) => await controller_1.UsersController.updateUser(req, res));
router.delete('/', async (req, res) => await controller_1.UsersController.removeUser(req, res));
router.post('/login', async (req, res) => await controller_1.UsersController.loginUser(req, res));
router.post('/register', async (req, res) => await controller_1.UsersController.registerUser(req, res));
exports.default = router;
