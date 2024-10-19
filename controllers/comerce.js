const {ComerceModel} = require("../models")
const { handleHttpError } = require('../utils/handleError.js')
const { matchedData } = require('express-validator')

const getItems = async (req, res) => {
    try{
        // Creamos una variable. si es igual a true, ordena de manera ascendente, en caso contrario muestra todos los datos.
        const { sortBycif } = req.query
        let query = {};
        let options = {};
        if(sortBycif === "true") {
            options = {cif: 1} // 1 = asc, -1 = desc
        }
        const data = await ComerceModel.find(query).sort(options);
        res.send(data) 
    }catch(err){
        res.send("ocurrio un error"), console.log(err)
    }
}

// Funcion para crear un objeto en la BBDD 
const createItem = async (req, res) => {
    try{
        // Recibe los datos que debe subir y sube el objeto a la base de datos.
        const{body} = req
        const data = await ComerceModel.create(body)
        res.send(data)
    }catch(err){
        console.log(err)
    }
}

// Funcion para mostrar un unico objeto, este es seleccionado por el cif.
const getItem = async (req, res) => {
    try{
        const {cif} = matchedData(req)
        // Con la funcion findOne se establece por que dato se ha de buscar el objeto.
        const data = await ComerceModel.findOne({cif});
        res.send(data) 
    }catch(err){
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
}

// Funcion para actualizar un objeto, seleccionandolo por su cif.
const updateItem = async (req, res) => {
    try{
        const {cif, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        // Funciona de la misma manera que get, pero este recoge los nuevos datos y los actualiza.
        const data = await ComerceModel.findOneAndUpdate( {cif}, body, {new:true});
        res.send(data) 
    }catch(err){
        // console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
    }
}

// Funcion para eliminar un objeto, encontrandolo por su cif.
const deleteItem = async (req, res) => {
    try{
        const {cif} = matchedData(req)
        // Funciona igual que get pero eliminando el objeto.
       
        const eliminado = await ComerceModel.findOneAndDelete({cif})
        if (!eliminado) {
            res.send(404, "No encontrado")
        }
        res.send("Eliminado")
    }catch(err){
        console.log(err)
        res.send("No se pudo")
    }
}

module.exports = {
    getItems, getItem,
    createItem, updateItem,
    deleteItem
};