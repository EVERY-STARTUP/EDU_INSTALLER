"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IWordGameScoreCreateRequest:
 *       type: object
 *       properties:
 *         score:
 *           type: number
 *           example: 22
 *         wordGameId:
 *           type: number
 *           example: 1
 *       required:
 *         - score
 *         - wordGameId
 */
/**
 * @swagger
 * /api/v1/games/words/scores:
 *   get:
 *     summary: Get all word game scores with optional filters
 *     tags: [WORD GAME SCORE]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of game word scores retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/games/words/scores/detail/{id}:
 *   get:
 *     summary: Get game word detail by ID
 *     tags: [WORD GAME SCORE]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: userId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Module detail retrieved successfully
 *       404:
 *         description: Module not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/games/words/scores:
 *   post:
 *     summary: Create a new game word score
 *     tags: [WORD GAME SCORE]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IWordGameScoreCreateRequest'
 *     responses:
 *       201:
 *         description: Module created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
