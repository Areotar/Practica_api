const mongooseDelete = require("mongoose-delete")

// Es el modelo de datos de la web del comercio.
const mongoose = require("mongoose")
const webScheme = new mongoose.Schema(
    {
        cif: {
            type: String,
            unique: true
        }, 
        ciudad: {
            type: String
        },  
        actividad: {
            type: String
        },
        titulo: {
            type: String,
        },
        resumen: {  
            type: String,
        },
        textos: {
            type: [String],
            required: true
        },
        imagenes: {
            type: [String], // URLs to the images
            required: true
        },
        reseñas: {
            scoring: {
                type: Number,
                default: 0,
                min: 0,
                max: 5
            },
            total: {
                type: Number,
                default:0
            },
            cuerpo: {
                type: [String],
                default: []
            }
        }
        },
    
    {
        timestamp: true, // TODO createdAt, updatedAt
        versionKey: false
    }
)
webScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("web", webScheme)