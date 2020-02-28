import axios from 'axios';

import { logout } from '../actions/userLogin';

import {
  BORRAR_USUARIO_ERROR,
  BORRAR_USUARIO_INICIADO,
  BORRAR_USUARIO_SUCCESS
} from '../types';

export const borrarUsuario = history => dispatch => {
  dispatch(borrarUsuarioIniciado());

  axios
    .delete('/api/users/delete')
    .then(res => {
      dispatch(borrarUsuarioSuccess());
      dispatch(logout(history));
    })
    .catch(err => dispatch(borrarUsuarioError(err.response.data.error)));
};

const borrarUsuarioIniciado = () => {
  return {
    type: BORRAR_USUARIO_INICIADO
  };
};

const borrarUsuarioSuccess = () => {
  return {
    type: BORRAR_USUARIO_SUCCESS
  };
};

const borrarUsuarioError = error => {
  return {
    type: BORRAR_USUARIO_ERROR,
    payload: error
  };
};
