"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     IStoreRequest:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: "Toko Baju Kekinian"
 *         description:
 *           type: string
 *           example: "Menjual baju pria dan wanita kekinian"
 *         icon:
 *           type: string
 *           example: "https://example.com/toko.jpg"
 *         slug:
 *           type: string
 *           example: "toko-baju-kekinian"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: "active"
 *
 *     IStoreUpdateRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         slug:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive]
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   get:
 *     summary: Get all stores
 *     tags: [STORES]
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
 *         description: List of stores
 */
/**
 * @swagger
 * /api/v1/stores/detail/{storeId}:
 *   get:
 *     summary: Get store detail by ID
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Store detail
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   post:
 *     summary: Create a new store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreRequest'
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/v1/stores/:
 *   patch:
 *     summary: Update a store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IStoreUpdateRequest'
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       404:
 *         description: Store not found
 */
/**
 * @swagger
 * /api/v1/stores/{storeId}:
 *   delete:
 *     summary: Delete a store
 *     tags: [STORES]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Store deleted successfully
 */
