const Joi = require('@hapi/joi');

const userValidation = Joi.object({
  nombreUsuario: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .alphanum()
    .required()
    .messages({
      'string.empty': 'Debe ingresar un nombre de usuario',
      'string.alphanum': 'Solo se admiten caracteres alfanumericos',
      'string.min': 'El nombre de usuario debe contener al menos 8 caracteres',
      'string.max':
        'El nombre de usuario debe contener como maximo 30 caracteres'
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .messages({
      'string.empty': 'Debe ingresar una contraseña',
      'string.min': 'La contraseña debe contener al menos 8 caracteres',
      'string.max': 'La contraseña debe contener como maximo 30 caracteres'
    }),
  nombre: Joi.string().allow(''),
  ciudad: Joi.string().allow(''),
  pais: Joi.string().allow(''),
  foto: Joi.string().allow('')
});

module.exports = userValidation;
