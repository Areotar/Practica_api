const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const validatorCreateItem = [
    check("nombre").exists().notEmpty(), //.isLength(min:5, max:90)
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("edad").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().notEmpty(),
    check("ofertas").exists().notEmpty().isBoolean(),
    check("role").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
    check("nombre").exists().notEmpty(), //.isLength(min:5, max:90)
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("edad").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().notEmpty(),
    check("ofertas").exists().notEmpty().isBoolean(),
    check("role").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorGetRol = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
    check("role").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem, validatorGetRol }