const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lugarSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    idUsuario: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    usuario: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      nombreUsuario: {
        type: String
      },
      foto: {
        type: String
      }
    },
    latlng: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    foto: {
      type: String,
      required: true
    },
    descripcion: {
      type: String
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    ],
    comentarios: [
      {
        usuario: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        nombreUsuario: {
          type: String
        },
        foto: {
          type: String
        },
        comentario: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Lugar = mongoose.model('lugares', lugarSchema);
