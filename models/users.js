const mongoose = require('mongoose');

// Definir el esquema básico del usuario
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  intereses: {
    type: [String] // Array de intereses
  },
  ofertas: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    // Para que no se envíe este elemento al hacer get
    // select: false
  }
});

// Crear el modelo del usuario
module.exports = mongoose.model('User', userSchema);
