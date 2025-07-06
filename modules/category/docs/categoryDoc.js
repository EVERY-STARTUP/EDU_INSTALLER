"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     ICategoryRequest:
 *       type: object
 *       properties:
 *         storeId:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Pakaian Pria"
 *
 *
 *     ICategoryUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Pakaian Wanita"
 *
 */
/**
 * @swagger
 * /api/v1/categories/:
 *   get:
 *     summary: Get all categories
 *     tags: [CATEGORIES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: storeId
 *         required: false
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of categories
 */
/**
 * @swagger
 * /api/v1/categories/detail/{categoryId}:
 *   get:
 *     summary: Get category detail by ID
 *     tags: [CATEGORIES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Category detail
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /api/v1/categories/:
 *   post:
 *     summary: Create a new category
 *     tags: [CATEGORIES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ICategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/categories/:
 *   patch:
 *     summary: Update a category
 *     tags: [CATEGORIES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ICategoryUpdateRequest'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /api/v1/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [CATEGORIES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
