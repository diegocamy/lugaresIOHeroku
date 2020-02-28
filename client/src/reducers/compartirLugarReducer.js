import {
  INICIO_COMPARTIR_LUGAR,
  LUGAR_COMPARTIDO_EXITO,
  ERROR_COMPARTIENDO_LUGAR
} from '../types';

const initialState = {
  compartiendo: false,
  error: ''
};

export default function compartirLugarReducer(state = initialState, action) {
  switch (action.type) {
    case INICIO_COMPARTIR_LUGAR:
      return {
        ...state,
        compartiendo: true
      };
    case LUGAR_COMPARTIDO_EXITO:
      return {
        ...state,
        compartiendo: false
      };
    case ERROR_COMPARTIENDO_LUGAR:
      return {
        compartiendo: false,
        error: action.payload
      };
    default:
      return state;
  }
}
