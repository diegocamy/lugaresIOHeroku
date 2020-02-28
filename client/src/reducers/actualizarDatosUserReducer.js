import {
  INICIO_ACTUALIZACION_DATOS_USER,
  USER_ACTUALIZADO_EXITO,
  ERROR_ACTUALIZANDO_USER
} from '../types';

const initialState = {
  actualizando: false,
  error: ''
};

export default function actualizarDatosUserReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case INICIO_ACTUALIZACION_DATOS_USER:
      return {
        ...state,
        actualizando: true,
        error: ''
      };
    case USER_ACTUALIZADO_EXITO:
      return {
        ...state,
        actualizando: false
      };
    case ERROR_ACTUALIZANDO_USER:
      return {
        ...state,
        actualizando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
