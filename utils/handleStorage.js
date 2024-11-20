const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, callback) { //Pasan argumentos automáticamente
        const pathStorage = __dirname + "/../storage"
        // console.log(pathStorage)
        callback(null, pathStorage) //error y destination
    },
    filename: function (req, file, callback) { //Sobreescribimos o renombramos
        //Tienen extensión jpg, pdf, mp4
        const ext = file.originalname.split(".").pop() //el último valor
        // console.log(filename)
        const filename = "file-" + Date.now() + "." + ext
        callback(null, filename)
    }
})

const memory = multer.memoryStorage()

// Middleware en la ruta y el controlador
const uploadMiddleware = multer({ storage });
const uploadMiddlewareMemory = multer({storage: memory})
module.exports = { uploadMiddleware, uploadMiddlewareMemory}

// module.exports = uploadMiddleware
