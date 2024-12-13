const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")
const authMiddleware = require("../middleware/session")
const verifyToken = require("../utils/handleJwt")

// Funcion que registra al usuario
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)

        // Encripta la contraseña
        const password = await encrypt(req.password)

        const body = { ...req, password } // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
        const dataUser = await usersModel.create(body)

        dataUser.set('password', undefined, { strict: false })
        dataUser.set('role', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        
        res.send(data)
    }catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGITSER")
    }
}

// Funcion que loguea al usuario
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name email role")
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        const hashPassword = user.password;
        // Compara la contraseña ingresada con el hash almacenado
        const check = await compare(req.password, hashPassword)
        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }
        user.set("password", undefined, { strict: false }) //Si no queremos que se muestre el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

// Un usuario solo se puede eliminar a el mismo
const deleteCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();
        // Verifica si es el mismo usuario
        if (id !== userId) {
            return res.status(403).send("No puedes eliminar a otros usuarios");
        }
        const eliminado = await usersModel.findByIdAndDelete(id);
        if (!eliminado) {
            res.status(404).send("No encontrado")
        }
        res.status(200).send("Usuario eliminado")
    } catch (err) {
        console.log(err)
        res.send("No se pudo")
    }
}

// Un usuario solo se puede modificar a el mismo
const patchCtrl = async (req, res) => {
    try {
        
        const { id } = matchedData(req);
        const body = req.body
        const userId = req.user._id.toString();

        if (body.password) {
            body.password = await encrypt(body.password);
        }

        // Verifica si es el mismo usuario
        if (id !== userId) {
            return res.status(403).send("No puedes modificar a otros usuarios");
        }
        const modificado = await usersModel.findByIdAndUpdate(id, body, { new: true });
        modificado.set('password', undefined, { strict: false })
        modificado.set('role', undefined, { strict: false })
        if (!modificado) {
            res.status(404).send("No encontrado")
        }
        res.status(200).send(modificado)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_PATCH_ITEMS', 403)
    }
}


module.exports = { registerCtrl, loginCtrl, deleteCtrl, patchCtrl }