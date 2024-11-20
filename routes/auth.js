const express = require("express")
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models")
const router = express.Router()
const { validatorRegister, validatorLogin, validatorPatch } = require("../validators/auth")
const { registerCtrl,loginCtrl, deleteCtrl, patchCtrl } = require("../controllers/auth")
const authMiddleware = require("../middleware/session")

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - Auth
 *      summary: User register
 *      description: Registra un nuevo usuario
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/register", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login user
 *      description: Logea a un usuario existente
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the user and a token   
 *          '401':
 *              description: Validation error
 */
router.post("/login", validatorLogin, loginCtrl)

/**
 * @openapi
 * /api/auth/users/{id}:
 *  delete:
 *      tags:
 *      - Auth
 *      summary: Delete user
 *      description: Delete a user by the same user
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
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddleware, deleteCtrl)

/**
 * @openapi
 * /api/auth/update/{id}:
 *  patch:
 *      tags:
 *      - Auth
 *      summary: Patch user
 *      description: Patch a user by cif
 *      parameters the same user:
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
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id", validatorPatch, authMiddleware, patchCtrl)


module.exports = router