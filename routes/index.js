// Este archivo sera util cuando el comercio crezca y se necesiten mas ficheros.
// De esta manera se podra actualizar de manera sencilla.

const express = require("express")
const fs = require("fs")
const router = express.Router()
const removeExtension = (fileName) => {

    return fileName.split('.').shift()
}
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // comerce
    if (name !== 'index') {
        router.use('/' + name, require('./' + name))
    }
})
module.exports = router