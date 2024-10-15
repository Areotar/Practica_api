// En este archivo se definen las rutas y la funcion de cada una.

const express = require("express");
const router = express.Router()
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/comerce")

router.get("/", getItems)
router.get("/:cif", getItem)
router.post("/", createItem)
router.put("/:cif", updateItem)
router.delete("/:cif", deleteItem)


module.exports = router