import axios from 'axios';

import {
  FETCH_TODOS_LUGARES_INICIO,
  FETCH_TODOS_LUGARES_SUCCESS,
  FETCH_TODOS_LUGARES_ERROR
} from '../types';

export const fetchTodosLosLugares = () => dispatch => {
  dispatch(fetchTodosLosLugaresInicio());

  axios
    .get('/api/places')
    .then(res => {
      dispatch(fetchTodosLosLugaresSuccess(res.data));
    })
    .catch(err => dispatch(fetchTodosLosLugaresError(err)));
};

const fetchTodosLosLugaresInicio = () => {
  return { type: FETCH_TODOS_LUGARES_INICIO };
};

const fetchTodosLosLugaresSuccess = lugares => {
  return { type: FETCH_TODOS_LUGARES_SUCCESS, payload: lugares };
};

const fetchTodosLosLugaresError = error => {
  return { type: FETCH_TODOS_LUGARES_ERROR, payload: error };
};
