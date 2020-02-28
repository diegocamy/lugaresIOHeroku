import {
  BORRAR_USUARIO_ERROR,
  BORRAR_USUARIO_INICIADO,
  BORRAR_USUARIO_SUCCESS
} from '../types';

const initialState = {
  cargando: false,
  error: ''
};

export default function eliminarPerfilReducer(state = initialState, action) {
  switch (action.type) {
    case BORRAR_USUARIO_INICIADO:
      return {
        ...state,
        cargando: true,
        error: ''
      };
    case BORRAR_USUARIO_SUCCESS:
      return {
        ...state,
        cargando: false,
        error: ''
      };
    case BORRAR_USUARIO_ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
