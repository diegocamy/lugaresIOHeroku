const express = require('express');
const route = express.Router();
// require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'lugaresio'
});

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '/tmp/uploads');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

const upload = multer({ storage });

//User mongoose schema
const User = require('../models/User');

//joi user validation
const userValidation = require('../validation/userValidation');

//auth middleware
const authValidate = require('../authentication/validAuth');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST /api/users/register
// registra un usuario
// publica

route.post('/register', (req, res) => {
  User.findOne({ nombreUsuario: req.body.nombreUsuario })
    .then(user => {
      if (user) {
        return res.json({ error: 'Ese nombre de usuario ya existe' });
      }

      //usuario ingresado
      const usuarioIngresado = {
        nombreUsuario: req.body.nombreUsuario,
        nombre: req.body.nombre || '',
        ciudad: req.body.ciudad || '',
        pais: req.body.pais || '',
        password: req.body.password,
        password2: req.body.password2
      };

      if (!usuarioIngresado.nombreUsuario) {
        return res.json({ error: 'Debe ingresar un nombre de usuario!' });
      }

      //checkear si las contraseñas coinciden
      if (usuarioIngresado.password !== usuarioIngresado.password2) {
        return res.json({ error: 'Las contraseñas no coinciden' });
      }

      delete usuarioIngresado.password2;

      //validar los datos ingresados con Joi
      const validation = userValidation.validate(usuarioIngresado);

      if (validation.error) {
        return res.json({ error: validation.error.details[0].message });
      }

      //crear usuario
      const nuevoUsuario = new User({ ...validation.value });

      //hash password
      bcrypt
        .hash(nuevoUsuario.password, 10)
        .then(hashPass => {
          //reemplazar password
          nuevoUsuario.password = hashPass;
          //guardar usuario en db
          nuevoUsuario
            .save()
            .then(usr => res.json({ id: usr._id, usuario: usr.nombreUsuario }))
            .catch(e => res.json(e));
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json({ error: 'Ese nombre de usuario ya existe!' }));
});

// POST /api/users/login
// logea un usuario
// publica

route.post('/login', (req, res) => {
  //datos ingresados
  const usuarioIngresado = {
    nombreUsuario: req.body.nombreUsuario,
    password: req.body.password
  };

  //buscar usuario en db
  User.findOne({ nombreUsuario: usuarioIngresado.nombreUsuario }).then(
    usuario => {
      if (!usuario) {
        return res
          .status(400)
          .json({ error: 'Usuario o contraseña incorrecta' });
      }

      //comparar password
      bcrypt
        .compare(usuarioIngresado.password, usuario.password)
        .then(sonIguales => {
          if (sonIguales) {
            //JWT payload
            const payload = {
              id: usuario._id,
              nombreUsuario: usuario.nombreUsuario,
              foto: usuario.foto
            };
            //JWT
            jwt.sign(
              payload,
              process.env.LLAVE,
              {
                expiresIn: '1h'
              },
              //devolver token
              (err, token) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(400)
                    .json({ error: 'Usuario o contraseña incorrecta' });
                }

                res.json({ token });
              }
            );
          } else {
            return res
              .status(400)
              .json({ error: 'Usuario o contraseña incorrecta' });
          }
        })
        .catch(err => res.sendStatus(400).json(err));
    }
  );
});

// PATCH /api/users/update
// actualizar info del user
// privada

route.patch(
  '/update',
  authValidate,
  upload.single('foto'),
  async (req, res) => {
    try {
      //nuevos datos
      const datosIngresados = {
        nombre: req.body.nombre || '',
        ciudad: req.body.ciudad || '',
        pais: req.body.pais || ''
      };

      if (req.file) {
        const url = await req.file.secure_url;

        if (url) {
          datosIngresados.foto = url;
        }
      }

      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { ...datosIngresados } },
        { new: true, useFindAndModify: false }
      );

      //JWT payload actualizado con la foto
      const payload = {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        foto: user.foto
      };
      //JWT
      jwt.sign(
        payload,
        process.env.LLAVE,
        {
          expiresIn: '1h'
        },
        //devolver token actualizado
        (err, token) => {
          if (err) {
            return res
              .status(400)
              .json({ error: 'Usuario o contraseña incorrecta' });
          }

          return res.json({ token });
        }
      );
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
);

// DELETE /api/users/
// borrar user
// privada

route.delete('/delete', authValidate, (req, res) => {
  User.findOneAndDelete({ _id: req.user.id })
    .then(() => res.json({ success: 'Usuario eliminado' }))
    .catch(err => res.status(400).json({ error: err }));
});

// GET /api/users/
// obtener lista de usuarios
// publica

route.get('/', (req, res) => {
  User.find()
    .sort('nombreUsuario')
    .then(users => {
      if (!users) {
        return res.status(404).json({ error: 'No existen usuarios.' });
      }

      res.json(users);
    })
    .catch(err => res.json(err));
});

// GET /api/users/:user_id
// obtener usuario por id
// publica

route.get('/:user_id', (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .select('-password')
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json(user);
    })
    .catch(err => res.status(404).json({ error: 'Usuario no encontrado.' }));
});

module.exports = route;
