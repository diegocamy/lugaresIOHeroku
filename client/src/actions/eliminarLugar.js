import axios from 'axios';

import {
  BORRAR_LUGAR_ERROR,
  BORRAR_LUGAR_INICIADO,
  BORRAR_LUGAR_SUCCESS
} from '../types';

export const borrarLugar = (id, history) => dispatch => {
  dispatch(borrarLugarIniciado());

  axios
    .delete(`/api/places/${id}`)
    .then(res => {
      dispatch(borrarLugarSuccess());
      history.push('/lugares');
    })
    .catch(err => dispatch(borrarLugarError(err.response.data.error)));
};

const borrarLugarIniciado = () => {
  return {
    type: BORRAR_LUGAR_INICIADO
  };
};

const borrarLugarSuccess = () => {
  return {
    type: BORRAR_LUGAR_SUCCESS
  };
};

const borrarLugarError = error => {
  return {
    type: BORRAR_LUGAR_ERROR,
    payload: error
  };
};
