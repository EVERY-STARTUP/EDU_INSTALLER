"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const wordGame_1 = require("../controllers/wordGame");
const router = (0, express_1.Router)();
router.use(middlewares_1.middleware.useAuthorization);
router.get('/', wordGame_1.wordGameController.findAll);
router.get('/detail/:id', wordGame_1.wordGameController.findByDetail);
router.post('/', wordGame_1.wordGameController.create);
router.delete('/:id', wordGame_1.wordGameController.remove);
exports.default = router;
