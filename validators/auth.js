const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const validatorRegister = [
    check("nombre").exists().notEmpty(), //.isLength(min:5, max:90)
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("edad").exists().notEmpty(),
    check("ciudad").exists().notEmpty(),
    check("intereses").exists().notEmpty(),
    check("ofertas").exists().notEmpty().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorPatch = [
    check("id").exists().notEmpty().isMongoId(),
    check("role").optional().custom((value) => {
        // Lanza un error si se intenta cambiar el rol
        throw new Error('No puedes cambiar el rol del usuario');
    }),
    (req, res, next) => {
        return validateResults(req, res, next)
    },
]

module.exports = { validatorRegister, validatorLogin, validatorPatch }