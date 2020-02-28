import axios from 'axios';

import {
  FETCH_USER_INICIO,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_LUGARES_INICIO,
  FETCH_LUGARES_SUCCESS,
  FETCH_LUGARES_ERROR
} from '../types';

export const fetchProfile = id => dispatch => {
  dispatch(inicioFetchUser());

  axios
    .get(`/api/users/${id}`)
    .then(res => {
      dispatch(finFetchUser(res.data));
    })
    .catch(err => dispatch(errorFetchUser(err.response.data.error)));

  dispatch(inicioFetchLugares());

  axios
    .get(`/api/places/user/${id}`)
    .then(res => {
      dispatch(finFetchLugares(res.data));
    })
    .catch(err => dispatch(errorFetchLugares(err.response.data.error)));
};

const inicioFetchUser = () => {
  return {
    type: FETCH_USER_INICIO
  };
};

const inicioFetchLugares = () => {
  return {
    type: FETCH_LUGARES_INICIO
  };
};

const finFetchUser = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user
  };
};

const finFetchLugares = lugares => {
  return {
    type: FETCH_LUGARES_SUCCESS,
    payload: lugares
  };
};

const errorFetchUser = error => {
  return {
    type: FETCH_USER_ERROR,
    payload: error
  };
};

const errorFetchLugares = error => {
  return {
    type: FETCH_LUGARES_ERROR,
    payload: error
  };
};
