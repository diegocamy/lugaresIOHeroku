import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setAuthorizationToken } from '../utils/utils';

import {
  INICIO_ACTUALIZACION_DATOS_USER,
  USER_ACTUALIZADO_EXITO,
  ERROR_ACTUALIZANDO_USER,
  SET_USUARIO_ACTUAL
} from '../types';

export const editarPerfil = (data, history) => dispatch => {
  dispatch(inicioActualizacionDatos());

  axios
    .patch(`/api/users/update`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      //extraer token de la respuesta
      const token = res.data.token;
      //guardar token en local storage
      localStorage.setItem('token', token);
      //agregar authorization header a axios
      setAuthorizationToken(token);
      //decodificar token y guardarlo en store
      dispatch({ type: SET_USUARIO_ACTUAL, user: jwt.decode(token) });
      dispatch(datosActualizadoConExito());
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch(errorActualizandoDatos(err.response.data));
    });
};

const inicioActualizacionDatos = () => {
  return {
    type: INICIO_ACTUALIZACION_DATOS_USER
  };
};

const datosActualizadoConExito = () => {
  return {
    type: USER_ACTUALIZADO_EXITO
  };
};

const errorActualizandoDatos = error => {
  return {
    type: ERROR_ACTUALIZANDO_USER,
    payload: error.error
  };
};
