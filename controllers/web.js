const {websModel} = require("../models")
const {usersModel} = require("../models")
const { handleHttpError } = require('../utils/handleError.js')
const { matchedData } = require('express-validator')

// Funcion para mostrar datos de la bbdd
const getItems = async (req, res) => {
    try{
        // const user = req.user //<==Esto es para comprobar que funciona
        const data = await websModel.find({})
        res.send({data}) // user <==Esto es para comprobar que funciona
    }catch(err){
        console.log(err)
    }
}

// Hace un get de los usuario sinteresados en la web que hayan admitido spam
const getUsers = async (req, res) => {
    try{
        const cif = req.params.cif
        const web = await websModel.findOne({cif});
        const actividad = web.actividad
        // Busca los usuarios que permitan recibir ofertas y tengan interes en la actividad de la web
        const interesados = await usersModel.find({
                intereses: actividad, ofertas: true,
            },  "email");
        res.send(interesados)
    }catch(err){
        res.send("ocurrio un error"), console.log(err)
    }
}

// Funcion para mostrar un objeto de la bbdd
const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await websModel.findOne({_id: id})
        res.send(data)
    } catch (err) {
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM', 403)
    }
}

// Funcion para crear un objeto en la BBDD 
const createItem = async (req, res) => {
    try{
        // Recibe los datos que debe subir y sube el objeto a la base de datos.
        const comerce = req.body.cif
        const body = matchedData(req)
        const data = await websModel.create(body)
        const {cif} = matchedData(req)
        // console.log(cif, comerce)
        if (cif !== comerce) {
            return res.status(403).send("No puedes crear una web con el cif de otro usuario");
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

// Funcion para actualizar un archivo
const updateItem = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        const data = await websModel.findByIdAndUpdate(id, body, {new:true});
        const {cif} = matchedData(req)
        const comerce = req.body.cif

        if (cif !== comerce) {
            return res.status(403).send("No puedes modificar una web con el cif de otro usuario");
        }
        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
    }
}

// Funcion para eliminar un archivo
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const {cif} = matchedData(req)
        const { logic } = req.query
        const comerce = req.body.cif
        
        if (cif !== comerce) {
            return res.status(403).send("No puedes borrar una web con el cif de otro usuario");
        }
        // Condicion para que el borrado sea logico
        if (logic == "true"){
            const data = await websModel.delete({_id:id});
            res.send("Borrado de manera logica")
        }else {
            const data = await websModel.findOneAndDelete({_id:id})
            res.send("Borrado de manera fisica")
        }
    } catch (err) {
        console.log(err)
       handleHttpError(res, 'ERROR_DELETE_ITEMS', 403)
    }
}

// Funcion para actualizar un objeto
const patchItem = async (req, res) => {
    try{
        const {cif} = matchedData(req)
        const { id } = req.params;
        const { file } = req;
        const comerce = req.body.cif
        console.log(cif, comerce)
        if (cif !== comerce) {
            return res.status(403).send("No puedes crear una web con el cif de otro usuario");
        }

        const fileData = {
            filename: file.filename,
            url: `http://localhost:3000/${file.filename}`  // Construir la URL de la imagen con el formato solicitado
        }

        const updatedItem = await websModel.findByIdAndUpdate(
            id,
            // Añadir la nueva URL al array 'imagenes'
            { $push: { imagenes: fileData.url } },
            { new: true }
        );

        res.send(updatedItem);
    }catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_PATCH_ITEMS', 403)
    }
}

module.exports = {
    getItems, getItem,
    createItem, updateItem,
    deleteItem, patchItem, getUsers
};