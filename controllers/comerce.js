const { ComerceModel } = require("../models")
const { handleHttpError } = require('../utils/handleError.js')
const { matchedData } = require('express-validator')
const { tokenSign } = require("../utils/handleJwt")
const { sendEmail } = require('../utils/handleMail')

// Funcion para ver los comercios
const getItems = async (req, res) => {
    try {
        // Creamos una variable. si es igual a true, ordena de manera ascendente, en caso contrario muestra todos los datos.
        const { sortBycif } = req.query
        let query = {};
        let options = {};
        if (sortBycif === "true") {
            options = { cif: 1 } // 1 = asc, -1 = desc
        }
        const dataComerce = await ComerceModel.find(query).sort(options);
        res.send(dataComerce)
    } catch (err) {
        res.send("ocurrio un error"), console.log(err)
    }
}


// Funcion para crear un objeto en la BBDD 
const createItem = async (req, res) => {
    try {
        // Recibe los datos que debe subir y sube el objeto a la base de datos.
        const body = matchedData(req)
        const dataComerce = await ComerceModel.create(body)
        const datatoken = {
            token: await tokenSign(null, dataComerce),
            user: dataComerce
        }
        res.send(datatoken)
    } catch (err) {
        console.log(err)
    }
}

// Funcion para mostrar un unico objeto, este es seleccionado por el cif.
const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        // Con la funcion findOne se establece por que dato se ha de buscar el objeto.
        const data = await ComerceModel.findOne({ cif });
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

// Funcion para actualizar un objeto, seleccionandolo por su cif.
const updateItem = async (req, res) => {
    try {
        const { cif, ...body } = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        // Funciona de la misma manera que get, pero este recoge los nuevos datos y los actualiza.
        const data = await ComerceModel.findOneAndUpdate({ cif }, body, { new: true });
        res.send(data)
    } catch (err) {
        // console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
    }
}

// Funcion para eliminar un objeto, encontrandolo por su cif.
const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        const comerceCif = req.params.cif
        // console.log(cif, comerceCif)
        if (cif !== comerceCif) {
            return res.status(403).send("No puedes eliminar a otros usuarios");
        }
        // Funciona igual que get pero eliminando el objeto.
        const eliminado = await ComerceModel.findOneAndDelete({cif})
        // console.log(eliminado)
        if (!eliminado) {
            res.send(404, "No encontrado")
        }
        res.send("Comercio eliminado")
    } catch (err) {
        console.log(err)
        res.send("No se pudo")
    }
}

// Funcion para que el comercio o un admin envie correos
const send = async (req, res) => {
    try {
        const info = matchedData(req)
        const data = await sendEmail(info)
        res.send(data)
    } catch (err) {
        //console.log(err)
        handleHttpError(res, 'ERROR_SEND_EMAIL')
    }
}

module.exports = {
    getItems, getItem,
    createItem, updateItem,
    deleteItem, send,
};