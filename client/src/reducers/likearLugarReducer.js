import {
  LIKEAR_LUGAR_INICIADO,
  LIKEAR_LUGAR_SUCCESS,
  LIKEAR_LUGAR_ERROR
} from '../types';

const initialState = {
  cargando: false,
  error: ''
};

export default function comentarLugarReducer(state = initialState, action) {
  switch (action.type) {
    case LIKEAR_LUGAR_INICIADO:
      return {
        ...state,
        cargando: true
      };
    case LIKEAR_LUGAR_SUCCESS:
      return {
        ...state,
        cargando: false,
        error: ''
      };
    case LIKEAR_LUGAR_ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
