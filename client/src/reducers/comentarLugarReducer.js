import {
  COMENTAR_LUGAR_INICIADO,
  COMENTAR_LUGAR_SUCCESS,
  COMENTAR_LUGAR_ERROR
} from '../types';

const initialState = {
  cargando: false,
  error: ''
};

export default function comentarLugarReducer(state = initialState, action) {
  switch (action.type) {
    case COMENTAR_LUGAR_INICIADO:
      return {
        ...state,
        cargando: true
      };
    case COMENTAR_LUGAR_SUCCESS:
      return {
        ...state,
        cargando: false,
        error: ''
      };
    case COMENTAR_LUGAR_ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
