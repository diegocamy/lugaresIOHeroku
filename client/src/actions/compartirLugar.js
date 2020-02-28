import axios from 'axios';

import {
  INICIO_COMPARTIR_LUGAR,
  LUGAR_COMPARTIDO_EXITO,
  ERROR_COMPARTIENDO_LUGAR
} from '../types';

export const compartirLugar = (data, history) => dispatch => {
  dispatch(inicioCompartirLugar());

  axios
    .post(`/api/places`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      dispatch(lugarCompartidoConExito());
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch(errorCompartiendoLugar(err.response.data));
    });
};

const inicioCompartirLugar = () => {
  return {
    type: INICIO_COMPARTIR_LUGAR
  };
};

const lugarCompartidoConExito = () => {
  return {
    type: LUGAR_COMPARTIDO_EXITO
  };
};

const errorCompartiendoLugar = error => {
  return {
    type: ERROR_COMPARTIENDO_LUGAR,
    payload: error.error
  };
};
