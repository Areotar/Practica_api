const express = require("express");
const router = express.Router()
const { validatorCreateItem } = require("../validators/web")
const { validatorGetItem } = require("../validators/web")
const { validatorUpdateItem } = require("../validators/web")
const { validatorDeleteItem } = require("../validators/web")
const uploadMiddleware = require("../utils/handleStorage");
const {getItems, getItem, createItem, updateItem, deleteItem, patchItem} = require("../controllers/web")



// router.get("/:id", getItem)
// router.get("/", validatorGetItem, getItems)
router.get("/:id",validatorGetItem, getItem)
router.post("/", validatorCreateItem, createItem)
router.put("/:id", validatorUpdateItem, updateItem)
router.delete("/:id", validatorDeleteItem, deleteItem)
router.patch("/:id", uploadMiddleware.single("image"), patchItem)


module.exports = router