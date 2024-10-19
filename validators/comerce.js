const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const validatorGetItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("id_web").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("id_web").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorDeleteItem = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateItem, validatorGetItem, validatorUpdateItem, validatorDeleteItem }