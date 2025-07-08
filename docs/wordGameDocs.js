"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IWordGameCreateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Modul Dasar Pemrograman"
 *         description:
 *           type: string
 *           example: "Modul tentang konsep dasar pemrograman"
 *       required:
 *         - title
 *         - description
 *
 *     IWordGameFindDetailRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *       required:
 *         - id
 *
 *     IWordGameFindAllRequest:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         size:
 *           type: integer
 *           example: 10
 *         search:
 *           type: string
 *           example: "pemrograman"
 *         pagination:
 *           type: boolean
 *           example: true
 *         startDate:
 *           type: string
 *           example: "2024-01-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           example: "2024-12-31T23:59:59Z"
 */
/**
 * @swagger
 * /api/v1/games/words:
 *   get:
 *     summary: Get all word game with optional filters
 *     tags: [WORD GAME]
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
 *     responses:
 *       200:
 *         description: List of modules retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/v1/games/words/detail/{id}:
 *   get:
 *     summary: Get game word detail by ID
 *     tags: [WORD GAME]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 * /api/v1/games/words:
 *   post:
 *     summary: Create a new game word
 *     tags: [WORD GAME]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IWordGameCreateRequest'
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
/**
 * @swagger
 * /api/v1/games/words/{id}:
 *   delete:
 *     summary: Delete a game word by ID
 *     tags: [WORD GAME]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
