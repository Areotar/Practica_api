const express = require("express");
const router = express.Router()
const { validatorCreateItem } = require("../validators/web")
const { validatorGetItem } = require("../validators/web")
const { validatorUpdateItem } = require("../validators/web")
const { validatorDeleteItem } = require("../validators/web")
const { validatorPatchReseña } = require("../validators/web")
const uploadMiddleware = require("../utils/handleStorage");
const {getItems, getItem, createItem, updateItem, deleteItem, patchItem, getUsers, patchReseña} = require("../controllers/web");
const authMiddleware = require("../middleware/session");
const {uploadMiddlewareMemory} = require("../utils/handleStorage.js")


/**
 * @openapi
 * /buscador:
 *  get:
 *      tags:
 *      - Web
 *      summary: Obtener elementos mediante búsqueda
 *      description: Devuelve una lista de elementos en base a los parámetros de búsqueda.
 *      responses:
 *          '200':
 *              description: Lista de elementos obtenida
 *          '500':
 *              description: Error del servidor
 */
router.get("/buscador", getItems);

/**
 * @openapi
 * /api/web/{id}:
 *  get:
 *      tags:
 *      - Web
 *      summary: Obtener una web específica por ID
 *      description: Devuelve una web con base en el ID proporcionado.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la web a obtener
 *      responses:
 *          '200':
 *              description: Web obtenida exitosamente
 *          '500':
 *              description: Error del servidor
 */
router.get("/:id",validatorGetItem, getItem)

/**
 * @openapi
 * /api/comerce:
 *  get:
 *      tags:
 *      - Comerce
 *      summary: Obtener usuarios interesados en una empresa
 *      description: Las empresas pueden acceder a los emails de los usuarios interesados.
 *      parameters:
 *          - name: cif
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: CIF de la empresa
 *      responses:
 *          '200':
 *              description: Usuarios interesados obtenidos exitosamente
 *          '500':
 *              description: Error del servidor
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
 *          required: true
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
 *      summary: Actualizar una web
 *      description: Actualiza los datos de una web específica.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la web a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Web actualizada exitosamente
 *          '401':
 *              description: Error de validación
 */
router.put("/:id", validatorUpdateItem, authMiddleware, updateItem)

/**
 * @openapi
 * /api/web/{id}:
 *  delete:
 *      tags:
 *      - Web
 *      summary: Eliminar una web
 *      description: Elimina una web específica por su ID.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la web a eliminar
 *      responses:
 *          '200':
 *              description: Web eliminada exitosamente
 *          '401':
 *              description: Error de validación
 */
router.delete("/:id", validatorDeleteItem, authMiddleware, deleteItem)

/**
 * @openapi
 * /comentarios/{id}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Actualizar un comentario
 *      description: Actualiza el contenido de un comentario específico por ID.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: ID del comentario a actualizar
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      responses:
 *          '200':
 *              description: Comentario actualizado con éxito 
 *          '500':
 *              description: Error del servidor
 */
router.patch("/comentarios/:id", validatorPatchReseña, patchReseña);

/**
 * @openapi
 * /api/web/{id}:
 *  patch:
 *      tags:
 *      - Web
 *      summary: Añadir una imagen a una web
 *      description: Actualiza una web específica para añadir una imagen por ID.
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: ID de la web a actualizar
 *      requestBody:
 *          required: true 
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Web actualizada con la imagen
 *          '401':
 *              description: Error de validación
 */
router.patch("/:id", authMiddleware, uploadMiddlewareMemory.single("image"), patchItem)


module.exports = router