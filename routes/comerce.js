const express = require("express");
const router = express.Router();

// Validadores y controladores
const { 
    validatorCreateItem, 
    validatorGetItem, 
    validatorUpdateItem, 
    validatorDeleteItem, 
    validatorMail 
} = require("../validators/comerce");

const { 
    getItems, 
    getItem, 
    createItem, 
    updateItem, 
    deleteItem, 
    send 
} = require("../controllers/comerce");

// Middlewares
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

// router.post("/", validatorCreateItem, customHeader, createItem)

/**
 * @openapi
 * /mail:
 *  post:
 *      tags:
 *      - Correo
 *      summary: Enviar un correo electrónico
 *      description: Envía un correo electrónico con autenticación.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      responses:
 *          '200':
 *              description: Correo enviado
 *          '500':
 *              description: Error del servidor
 *      security:
 *          - bearerAuth: []
 */
router.post("/mail", authMiddleware, validatorMail, send);

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
 *      summary: Get comerce por cif
 *      description: Solo un admin puede acceder a estos datos
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: CIF del comercio
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the comerce
 *          '404':
 *              description: comerce not found
 *          '500':
 *              description: server error
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
 * /api/comerce/{cif}:
 *  delete:
 *      tags:
 *      - Comerce
 *      summary: Delete a comerce
 *      description: Elimina un comercio del sistema por su CIF. Solo un administrador puede hacerlo
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: CIF del comercio que se desea eliminar
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Comerce deleted
 *          '404':
 *              description: Comerce not found
 *          '500':
 *              description: server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:cif", validatorDeleteItem, authMiddleware, deleteItem)


module.exports = router