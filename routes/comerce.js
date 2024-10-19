// En este archivo se definen las rutas y la funcion de cada una.
const { validatorCreateItem } = require("../validators/comerce")
const { validatorGetItem } = require("../validators/comerce")
const { validatorUpdateItem } = require("../validators/comerce")
const { validatorDeleteItem } = require("../validators/comerce")
const express = require("express");
const router = express.Router()
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/comerce")

// router.post("/", validatorCreateItem, customHeader, createItem)
router.get("/", getItems)
router.get("/:cif",validatorGetItem, getItem)
router.post("/", validatorCreateItem, createItem)
router.put("/:cif", validatorUpdateItem, updateItem)
router.delete("/:cif", validatorDeleteItem, deleteItem)


module.exports = router