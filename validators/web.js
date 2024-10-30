const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorCreateItem = [
    check("cif").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("actividad").exists().notEmpty(), //.isLength(min:5, max:90)
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("imagenes").exists().notEmpty(),
    check("reseñas").exists().notEmpty(),
    check("reseñas.scoring").exists().notEmpty().isFloat({ min: 0, max: 5 }),
    check("reseñas.total").exists().notEmpty().isInt(),
    check("reseñas.cuerpo").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
    check("cif").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("actividad").exists().notEmpty(), 
    check("titulo").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    check("textos").exists().notEmpty(),
    check("imagenes").exists().notEmpty(),
    check("reseñas").exists().notEmpty(),
    check("reseñas.scoring").exists().notEmpty().isFloat({ min: 0, max: 5 }),
    check("reseñas.total").exists().notEmpty().isInt(),
    check("reseñas.cuerpo").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorDeleteItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem }