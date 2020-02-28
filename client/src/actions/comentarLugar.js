import axios from 'axios';

import {
  COMENTAR_LUGAR_INICIADO,
  COMENTAR_LUGAR_SUCCESS,
  COMENTAR_LUGAR_ERROR,
  FETCH_LUGAR_SUCCESS
} from '../types';

export const comentarLugar = (comentario, id) => dispatch => {
  dispatch(comentarLugarIniciado());

  axios
    .post(`/api/places/comment/${id}`, { comentario })
    .then(res => {
      dispatch(comentarLugarSuccess());
      dispatch({ type: FETCH_LUGAR_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch(comentarLugarError(err.response.data.error)));
};

const comentarLugarIniciado = () => {
  return { type: COMENTAR_LUGAR_INICIADO };
};

const comentarLugarSuccess = () => {
  return { type: COMENTAR_LUGAR_SUCCESS };
};

const comentarLugarError = error => {
  return { type: COMENTAR_LUGAR_ERROR, payload: error };
};
