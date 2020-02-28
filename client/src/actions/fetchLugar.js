import axios from 'axios';

import {
  FETCH_LUGAR_INICIO,
  FETCH_LUGAR_ERROR,
  FETCH_LUGAR_SUCCESS
} from '../types';

export const fetchLugar = id => dispatch => {
  dispatch(inicioFetchLugar());

  axios
    .get(`/api/places/${id}`)
    .then(res => {
      dispatch(fetchLugarSuccess(res.data));
    })
    .catch(err => dispatch(fetchLugarError(err.response.data.error)));
};

const inicioFetchLugar = () => {
  return { type: FETCH_LUGAR_INICIO };
};

const fetchLugarSuccess = lugar => {
  return {
    type: FETCH_LUGAR_SUCCESS,
    payload: lugar
  };
};

const fetchLugarError = error => {
  return {
    type: FETCH_LUGAR_ERROR,
    payload: error
  };
};
