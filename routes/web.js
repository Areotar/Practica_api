const express = require("express");
const router = express.Router()
const { validatorCreateItem } = require("../validators/web")
const { validatorGetItem } = require("../validators/web")
const { validatorUpdateItem } = require("../validators/web")
const { validatorDeleteItem } = require("../validators/web")
const uploadMiddleware = require("../utils/handleStorage");
const {getItems, getItem, createItem, updateItem, deleteItem, patchItem, getUsers} = require("../controllers/web");
const authMiddleware = require("../middleware/session");



// router.get("/:id", getItem)
// router.get("/", validatorGetItem, getItems)
/**
 * @openapi
 * /api/web/{id}:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get web del sistema por el id
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 */
router.get("/:id",validatorGetItem, authMiddleware, getItem)

/**
 * @openapi
 * /api/comerce:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Get de los usuarios que tienen interes en la empresa
 *      description: 'Las empresan accenden a los emails de los usuarios interesados'
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/interes/:cif", authMiddleware, getUsers)

/**
 * @openapi
 * /api/web:
 *  post:
 *      tags:
 *      - Web
 *      summary: Create a web
 *      description: Registra una nueva web
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/", validatorCreateItem, authMiddleware, createItem)

/**
 * @openapi
 * /api/web/{id}:
 *  put:
 *      tags:
 *      - Web
 *      summary: Update Web
 *      description: Update a Web
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
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.put("/:id", validatorUpdateItem, authMiddleware, updateItem)

/**
 * @openapi
 * /api/web/{id}:
 *  delete:
 *      tags:
 *      - Web
 *      summary: Delete web
 *      description: Delete a web by the id
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
router.delete("/:id", validatorDeleteItem, authMiddleware, deleteItem)

/**
 * @openapi
 * /api/web/{id}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Patch web
 *      description: Patch a web to add a image, by id
 *      parametersthe same user:
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
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.patch("/:id", uploadMiddleware.single("image"), authMiddleware, patchItem)


module.exports = router