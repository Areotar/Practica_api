// const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Crea un cliente OAuth2 para la autenticación de Gmail
const createTransporter = async () => {
    // Crea una instancia de OAuth2 con las credenciales de Google
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
    
    // Configura el refresh token para obtener acceso a la cuenta
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // Obtiene el token de acceso usando el refresh token
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token.");
            }
            resolve(token);
        });
    });

    // Crea el transportador de correo utilizando nodemailer y OAuth2
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            // Dirección de correo desde la cual se enviarán los emails
            user: process.env.EMAIL, 
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    return transporter;
};

// Función para enviar el correo electrónico
const sendEmail = async (emailOptions) => {
    try {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { sendEmail };
