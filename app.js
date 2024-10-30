const express = require("express")
const dbConnect = require('./config/mongo')
const morganBody = require("morgan-body")
const { IncomingWebhook } = require("@slack/webhook")
const loggerStream = require("./utils/handleLogger")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")


require('dotenv').config();
const app = express()

app.use(express.json())

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
)

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function (req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})
    
app.use("/api/", require("./routes"))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})
dbConnect()
app.use(express.static("storage")) // http://localhost:3000/file.jpg