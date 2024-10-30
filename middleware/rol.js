const { handleHttpError } = require("../utils/handleError")

// Chekea que el rol este en los roles establecidos
const checkRol = (roles) => (req, res, next) => { // Doble argumento
    try {
        const { user } = req
        const userRol = user.role
        const checkValueRol = roles.includes(userRol) //Comprobamos que el rol del usuario esté en roles
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}
module.exports = checkRol