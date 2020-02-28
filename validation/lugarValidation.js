const Joi = require('@hapi/joi');

const lugarValidation = Joi.object({
  nombre: Joi.string()
    .required()
    .messages({
      'string.empty': 'Debe ingresar un nombre'
    }),
  latlng: Joi.object()
    .required()
    .messages({
      'object.required': 'Debe incluir latitud y longitud'
    }),
  idUsuario: Joi.string().required(),
  usuario: Joi.object(),
  foto: Joi.required().messages({
    'any.empty': 'Debe cargar una foto'
  }),
  descripcion: Joi.string().allow(''),
  likes: Joi.array(),
  comentarios: Joi.array()
});

module.exports = lugarValidation;
