
const express = require("express")
const dbConnect = require('./config/mongo')

require('dotenv').config();
const app = express()

app.use(express.json())

app.use("/api/", require("./routes")) 

const port = process.env.PORT || 3000

app.listen(port, () => {
 console.log("Servidor escuchando en el puerto " + port)
})
dbConnect()
app.use(express.static("storage")) // http://localhost:3000/file.jpg