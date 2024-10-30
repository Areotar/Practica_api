const jwt = require("jsonwebtoken")
const comerce = require("../models/comerce")
const JWT_SECRET = process.env.JWT_SECRET
// null, comerce = comerce
// user, null = user
const tokenSign = (user,comerce) => {
    const dataUser = user ? user._id: null
    const expiration = user ? "24h" : "1y";
    const dataCommerce = comerce ? comerce.cif : null
    
    const sign = jwt.sign(
        {
            _id: dataUser,
            cif: dataCommerce
        },
        JWT_SECRET,
        {
            expiresIn: expiration
        }
    )
    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}


module.exports = { tokenSign, verifyToken }