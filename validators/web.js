const { check } = require("express-validator")
const { param } = require('express-validator')
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
    (req, res, next) => validateResults(req, res, next)
]

const validatorUpdateItem = [
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
    (req, res, next) => validateResults(req, res, next)
]

const validatorDeleteItem = [
    param('cif').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorPatchReseña = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
    check("comentario").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem, validatorPatchReseña}