const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nombre: {
      type: String
    },
    ciudad: {
      type: String
    },
    pais: {
      type: String
    },
    foto: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('users', userSchema);
