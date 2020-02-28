import {
  BORRAR_LUGAR_ERROR,
  BORRAR_LUGAR_INICIADO,
  BORRAR_LUGAR_SUCCESS
} from '../types';

const initialState = {
  cargando: false,
  error: ''
};

export default function eliminarPerfilReducer(state = initialState, action) {
  switch (action.type) {
    case BORRAR_LUGAR_INICIADO:
      return {
        ...state,
        cargando: true,
        error: ''
      };
    case BORRAR_LUGAR_SUCCESS:
      return {
        ...state,
        cargando: false,
        error: ''
      };
    case BORRAR_LUGAR_ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
