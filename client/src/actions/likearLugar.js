import axios from 'axios';

import {
  LIKEAR_LUGAR_INICIADO,
  LIKEAR_LUGAR_SUCCESS,
  LIKEAR_LUGAR_ERROR,
  FETCH_LUGAR_SUCCESS
} from '../types';

export const likearLugar = id => dispatch => {
  dispatch(likearLugarIniciado());

  axios
    .post(`/api/places/like/${id}`)
    .then(res => {
      dispatch(likearLugarSuccess());
      dispatch({ type: FETCH_LUGAR_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch(likearLugarError(err.response.data.error)));
};

const likearLugarIniciado = () => {
  return { type: LIKEAR_LUGAR_INICIADO };
};

const likearLugarSuccess = () => {
  return { type: LIKEAR_LUGAR_SUCCESS };
};

const likearLugarError = error => {
  return { type: LIKEAR_LUGAR_ERROR, payload: error };
};
