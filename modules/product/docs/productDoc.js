"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IProductRequest:
 *       type: object
 *       properties:
 *         storeId:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Kemeja Flanel"
 *         description:
 *           type: string
 *           example: "Kemeja flanel lengan panjang untuk pria"
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         basePrice:
 *           type: number
 *           example: 75000
 *         sellingPrice:
 *           type: number
 *           example: 99000
 *         stock:
 *           type: number
 *           example: 100
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: "active"
 *         categoryId:
 *           type: number
 *           example: 5
 *     IProductUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         basePrice:
 *           type: number
 *         sellingPrice:
 *           type: number
 *         stock:
 *           type: number
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         categoryId:
 *           type: number
 */
/**
 * @swagger
 * /api/v1/products/:
 *   get:
 *     summary: Get all products
 *     tags: [PRODUCTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
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
 *         description: List of products
 */
/**
 * @swagger
 * /api/v1/products/detail/{productId}:
 *   get:
 *     summary: Get product detail by ID
 *     tags: [PRODUCTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Product detail
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /api/v1/products/:
 *   post:
 *     summary: Create a new product
 *     tags: [PRODUCTS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IProductRequest'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/products/:
 *   patch:
 *     summary: Update a product
 *     tags: [PRODUCTS]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /api/v1/products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [PRODUCTS]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
