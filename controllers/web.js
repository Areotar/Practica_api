const { websModel } = require("../models")
const { usersModel } = require("../models")
const { handleHttpError } = require('../utils/handleError.js')
const { matchedData } = require('express-validator')
const { uploadToPinata } = require("../utils/handleUploadIPFS.js")
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { civicinfo_v2 } = require("googleapis")


const getItems = async (req, res) => {
    try {
        const { ciudad, actividad, ordenar } = req.query
        // console.log(req.query)
        let query = {};
        if (ciudad) query.ciudad = ciudad;
        if (actividad) query.actividad = actividad;
        if (ordenar) {
            const webs = await websModel.find(query).sort({ "reseñas.scoring": ordenar === 'asc' ? 1 : -1 });
            res.send(webs)
        } else {
            const webs = await websModel.find(query);
            res.send(webs)
        }
    } catch (err) {
        res.send("ocurrio un error"), console.log(err)
    }
}

// Hace un get de los usuario sinteresados en la web que hayan admitido spam
const getUsers = async (req, res) => {
    try {
        const cif = req.params.cif
        const web = await websModel.findOne({ cif });
        const actividad = web.actividad
        // Busca los usuarios que permitan recibir ofertas y tengan interes en la actividad de la web
        const interesados = await usersModel.find({
            intereses: actividad, ofertas: true,
        }, "email");
        res.send(interesados)
    } catch (err) {
        res.send("ocurrio un error"), console.log(err)
    }
}

// Funcion para mostrar un objeto de la bbdd
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await websModel.findOne({ _id: id })
        res.send(data)
    } catch (err) {
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        console.log(err)
        handleHttpError(res, 'ERROR_GET_ITEM', 403)
    }
}

// Funcion para crear un objeto en la BBDD 
const createItem = async (req, res) => {
    try {
        // Recibe los datos que debe subir y sube el objeto a la base de datos.
        const comerce = req.comerce.cif
        const { cif } = matchedData(req)
        const body = matchedData(req)
        console.log(cif, comerce)
        if (cif !== comerce) {
            return res.status(403).send("No puedes crear una web con el cif de otro usuario");
        }
        const data = await websModel.create(body)
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

// Funcion para actualizar un archivo
const updateItem = async (req, res) => {
    try {
        const { cif } = req.params;
        const body = matchedData(req);  //Extrae el cif y el resto lo asigna a la constante body
        const comerce = req.comerce.cif

        if (cif !== comerce) {
            return res.status(403).send("No puedes modificar una web con el cif de otro usuario");
        }
        const data = await websModel.findOneAndUpdate({ cif: cif }, body, { new: true });
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
    }
}

// Funcion para eliminar un archivo
const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        const { logic } = req.query
        const comerce = req.comerce.cif

        console.log(comerce, cif)
        if (cif !== comerce) {
            return res.status(403).send("No puedes borrar una web con el CIF de otro usuario");
        }

        // Si el borrado es lógico
        if (logic === "true") {
            const data = await websModel.delete({ cif: comerce })
            console.log(data);

            if (data.matchedCount === 0) {
                return res.status(404).send("Web no encontrada");
            }

            return res.send("Borrado de manera lógica")
        } else {
            // Si el borrado es físico
            const data = await websModel.findOneAndDelete({ cif: comerce })
            if (!data) {
                return res.status(404).send("Web no encontrada");
            }

            return res.send("Borrado de manera física")
        }
    } catch (err) {
        console.error(err);
        return handleHttpError(res, 'ERROR_DELETE_ITEMS', 403)
    }
}

// Funcion para añadir un comenterio a las reseñas
const patchReseña = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const { comentario, puntuacion } = req.body

        const web = await websModel.findById(id);

        if (!web) {
            return res.status(404).send("Comercio no encontrado");
        }

        if (comentario) {
            web.reseñas.cuerpo.push(comentario)
        }

        if (puntuacion !== undefined && puntuacion >= 1 && puntuacion <= 5) {
            // Calcula la nueva puntuación media
            const sumaAnterior = web.reseñas.scoring * web.reseñas.total;
            const nuevaSuma = sumaAnterior + puntuacion;
            // Incrementar el número total de reseñas
            web.reseñas.total += 1;
            // Recalcular la media y redondear a 2 decimales
            web.reseñas.scoring = parseFloat((nuevaSuma / web.reseñas.total).toFixed(2));
        }

        const updatedWeb = await web.save()
        res.send(updatedWeb)

    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_PATCH_COMENTARIO', 403)
    }

}

// Funcion para subir una imagen
const patchItem = async (req, res) => {
    try {
        const { cif } = req.params
        const { file } = req;
        const comerce = req.comerce.cif
        // console.log(cif, comerce)

        if (cif !== comerce) {
            return res.status(403).send("No puedes modificar una web con el cif de otro usuario");
        }

        const fileBuffer = file.buffer;
        const fileName = file.originalname;
        // Sube el archivo a Pinata
        const pinataResponse = await uploadToPinata(fileBuffer, fileName);
        const ipfsFile = pinataResponse.IpfsHash;
        // Construye la URL para acceder al archivo
        const ipfsUrl = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`;

        // console.log({cif: cif})
        // Agrega la URL del archivo a la lista de imágenes del objeto
        const updatedItem = await websModel.findOneAndUpdate({ cif: cif },
            {
                $push: { imagenes: ipfsUrl }
            },
            { new: true }
        );

        res.send(updatedItem);
    } catch (err) {
        console.log(err)
        handleHttpError(res, 'ERROR_PATCH_ITEMS', 403)
    }
}

module.exports = {
    getItems, getItem,
    createItem, updateItem,
    deleteItem, patchItem,
    getUsers, patchReseña
};