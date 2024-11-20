const FormData = require('form-data')
require('dotenv').config()
const fetch = require('node-fetch')

// Función que sube un archivo a Pinata
const uploadToPinata = async (fileBuffer, fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    // Instancia un objeto FormData para preparar el archivo y metadatos
    let data = new FormData();
    // Añade el archivo a los datos del formulario
    data.append('file', fileBuffer, fileName);  
    const metadata = JSON.stringify({
        name: fileName,
        keyvalues: { 
            exampleKey: 'exampleValue'
        }
    });
    // Añade los metadatos al formulario
    data.append('pinataMetadata', metadata);
    const options = JSON.stringify({
        cidVersion: 0,
    });
    // Añade las opciones de Pinata
    data.append('pinataOptions', options);

    try {
        // Realiza la petición HTTP POST a la API de Pinata con los datos del formulario
        const response = await fetch(url, {
            method: 'POST',
            // Envia los datos como cuerpo de la petición
            body: data,
            headers: {
                'pinata_api_key': process.env.PINATA_KEY,
                'pinata_secret_api_key': process.env.PINATA_SECRET
            }
        });

        if (!response.ok) {
            throw new Error(`Error al subir el archivo: ${response.statusText}`);
        }

        // Convierte la respuesta en formato JSON y la retorna
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error al subir el archivo a Pinata:', error);
        throw error;
    }
};

module.exports = { uploadToPinata }
