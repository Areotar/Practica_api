const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require("../models")
const { ComerceModel } = require("../models")

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop()
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)
        if (!dataToken._id && !dataToken.cif) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        if (dataToken._id) {
            const user = await usersModel.findById(dataToken._id)
            req.user = user // Inyecto al user en la petición
        }

        if (dataToken.cif) {
            const comerce = await ComerceModel.findOne({ cif: dataToken.cif })
            req.comerce = comerce // Inyecto el cif en la petición
        }

        next()
    } catch (err) {
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}
module.exports = authMiddleware