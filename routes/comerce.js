// En este archivo se definen las rutas y la funcion de cada una.
const { validatorCreateItem } = require("../validators/comerce")
const { validatorGetItem } = require("../validators/comerce")
const { validatorUpdateItem } = require("../validators/comerce")
const { validatorDeleteItem } = require("../validators/comerce")
const authMiddleware = require("../middleware/session")
const express = require("express");
const router = express.Router()
const checkRol = require("../middleware/rol")
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/comerce")

// router.post("/", validatorCreateItem, customHeader, createItem)

/**
 * @openapi
 * /api/comerce:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Get comerce del sistema
 *      description: 'solo un admin puede acceder a los comercios'
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", authMiddleware, checkRol("admin"), getItems)


/**
 * @openapi
 * /api/comerce/{cif}:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Get comerce del sistema por el cif
 *      description: 'solo un admin puede acceder a los comercios'
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/:cif", validatorGetItem, authMiddleware, checkRol("admin"), getItem)

/**
 * @openapi
 * /api/comerce:
 *  post:
 *      tags:
 *      - Comerce
 *      summary: Create a comerce
 *      description: Registra un nuevo comercio
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comerce"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", validatorCreateItem, authMiddleware, checkRol("admin"), createItem)

/**
 * @openapi
 * /api/comerce/{cif}:
 *  put:
 *      tags:
 *      - Comerce
 *      summary: Update comerce
 *      description: Update a comerce by the cif, by an admin
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comerce"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:cif", validatorUpdateItem, authMiddleware, checkRol("admin"), updateItem)

/**
 * @openapi
 * /api/comerce/{id}:
 *  delete:
 *      tags:
 *      - Comerce
 *      summary: Delete user
 *      description: Delete a comerce by the cif
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the status
 *          '401':
 *              description: Validation error
 */
router.delete("/:cif", validatorDeleteItem, authMiddleware, deleteItem)


module.exports = router