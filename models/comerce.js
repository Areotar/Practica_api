// Es el modelo de datos del comercio.

const mongoose = require("mongoose")
const ComerceScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        cif: {
            type: String,
            unique: true
        },
        direccion: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        telefono: {
            type: String,
            unique: true
        },
        id_web: {
            type: Number,
            unique: true
        },
    },
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
module.exports = mongoose.model("comerce", ComerceScheme)