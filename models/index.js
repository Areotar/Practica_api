// Este archivo sera util cuando el comercio crezca y se necesiten mas ficheros.
// De esta manera se podra actualizar de manera sencilla.

const models = {
    ComerceModel: require('./comerce'),
    websModel: require('./web.js'),
    usersModel: require("./users.js")
}
module.exports = models