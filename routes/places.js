const express = require('express');
const route = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'lugaresio'
});

const upload = multer({ storage });

//auth middleware
const authValidate = require('../authentication/validAuth');

//lugares mongoose schema
const Lugar = require('../models/Lugar');

//validation para el lugar
const lugarValidation = require('../validation/lugarValidation');

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// GET /api/places/
// obtener todos los lugares
// publica

route.get('/', (req, res) => {
  Lugar.find()
    .select('_id nombre foto descripcion likes usuario latlng')
    .exec()
    .then(lugares => res.json(lugares))
    .catch(err => {
      return res.status(400).json({ error: err });
    });
});

// GET /api/places/:id
// obtener un lugar
// publica

route.get('/:id', (req, res) => {
  Lugar.findOne({ _id: req.params.id })
    .then(lugar => res.json(lugar))
    .catch(err => {
      return res.status(400).json({ error: 'Lugar no encontrado.' });
    });
});

// GET /api/places/user/:userI d
// obtener todos los lugares compartidos por un user
// publica

route.get('/user/:userId', (req, res) => {
  Lugar.find({ idUsuario: req.params.userId })
    .then(lugares => res.json(lugares))
    .catch(err => {
      return res.status(400).json({ error: 'No hay lugares para mostrar' });
    });
});

// POST /api/places/
// crear un lugar nuevo
// privada

route.post('/', authValidate, upload.single('fotoLugar'), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'Necesita subir una foto' });

    const lugarIngresado = {
      latlng: {
        lat: req.body.lat,
        lng: req.body.lng
      },
      nombre: req.body.nombre,
      idUsuario: req.user.id,
      usuario: {
        id: req.user.id,
        nombreUsuario: req.user.nombreUsuario,
        foto: req.user.foto
      },
      foto: '',
      descripcion: req.body.descripcion || ''
    };

    const url = await req.file.secure_url;

    if (url) {
      lugarIngresado.foto = url;
    }

    const validation = lugarValidation.validate(lugarIngresado);

    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const lugar = new Lugar({ ...validation.value });
    lugar.save((err, doc) => {
      if (err)
        return res
          .status(500)
          .json({ mensaje: 'Hubo un error al subir la img', error: err });

      res.json(doc);
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// POST /api/places/like/:id
// like a un lugar
// privada

route.post('/like/:id', authValidate, (req, res) => {
  Lugar.findOne({ _id: req.params.id }).then(lugar => {
    //Verificar si el usuario ha dado like
    const like = lugar.likes.find(el => el.toString() === req.user.id);

    //si ha dado like, elimina el like
    if (like) {
      const newLikeArray = lugar.likes.filter(
        lk => lk.toString() !== like.toString()
      );
      lugar.likes = [...newLikeArray];
    } else {
      //si no ha dado like, agrega el like
      lugar.likes.unshift(req.user.id);
    }

    //guarda los cambios
    lugar
      .save()
      .then(lugar => res.json(lugar))
      .catch(err => res.json({ errorazo: err }));
  });
  // .catch(error => res.status(404).json({ error: 'Lugar no encontrado' }));
});

// POST /api/places/comment/:id
// agrega un comentario a un lugar
// privada

route.post('/comment/:id', authValidate, (req, res) => {
  Lugar.findOne({ _id: req.params.id })
    .then(lugar => {
      //datos del comentario ingresado
      const comentarioIngresado = {
        usuario: req.user.id,
        nombreUsuario: req.user.nombreUsuario,
        foto: req.user.foto,
        comentario: req.body.comentario
      };

      //si el comentario no tiene texto, devolver un error
      if (comentarioIngresado.comentario.length === 0)
        return res.status(400).json({ error: 'Debe ingresar un comentario' });

      //agregar el comentario a la lista
      lugar.comentarios.push(comentarioIngresado);

      lugar
        .save()
        .then(lugar => res.json(lugar))
        .catch(err => res.json({ error: err }));
    })
    .catch(error => res.status(404).json({ error: 'Lugar no encontrado' }));
});

// POST /api/places/delete-comment/:id
// borra un comentario a un lugar
// privada

route.post(
  '/delete-comment/:idLugar/:idComentario',
  authValidate,
  (req, res) => {
    Lugar.findOne({ _id: req.params.idLugar })
      .then(lugar => {
        //datos del comentario
        const datosComentario = {
          usuario: req.user.id,
          idComentario: req.params.idComentario
        };

        //buscar comentario a borrar
        const comentarioElegido = lugar.comentarios.find(comentario => {
          return comentario._id.toString() === datosComentario.idComentario;
        });

        //si el comentario no existe, devolver un error
        if (!comentarioElegido)
          return res.status(404).json({ error: 'Comentario no encontrado' });

        //eliminar el comentario de la lista solamente si pertenece al usuario
        if (
          comentarioElegido.usuario.toString() ===
          datosComentario.usuario.toString()
        ) {
          lugar.comentarios = lugar.comentarios.filter(
            c => c !== comentarioElegido
          );
        } else {
          return res
            .status(401)
            .json({ error: 'No tien permisos para eliminar este comentario' });
        }

        lugar
          .save()
          .then(lugar => res.json(lugar))
          .catch(err => res.json({ error: err }));
      })
      .catch(error => res.status(404).json({ error: 'Lugar no encontrado' }));
  }
);

// PATCH /api/places/:id
// actualiza la info a un lugar
// privada

route.patch('/:id', authValidate, upload.single('fotoLugar'), (req, res) => {
  const nuevosDatos = {};

  if (req.file) {
    nuevosDatos.foto = req.file.path.replace(`\\`, '/');
  }

  if (req.body.lat && req.body.lng) {
    nuevosDatos.latlng = {};
    nuevosDatos.latlng.lat = req.body.lat;
    nuevosDatos.latlng.lng = req.body.lng;
  }

  if (req.body.nombre) {
    nuevosDatos.nombre = req.body.nombre;
  }

  if (req.body.descripcion) {
    nuevosDatos.descripcion = req.body.descripcion;
  }

  Lugar.findOneAndUpdate(
    { _id: req.params.id, usuario: req.user.id },
    nuevosDatos,
    {
      new: true,
      useFindAndModify: false
    }
  )
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(400).json({ error: err }));
});

// DELETE /api/places/:id
// borra un lugar
// privada

route.delete('/:id', authValidate, (req, res) => {
  Lugar.findOneAndDelete({
    _id: req.params.id,
    idUsuario: req.user.id
  })
    .then(lugar => res.json(lugar))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = route;
