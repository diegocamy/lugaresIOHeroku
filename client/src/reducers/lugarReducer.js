import {
  FETCH_LUGAR_INICIO,
  FETCH_LUGAR_ERROR,
  FETCH_LUGAR_SUCCESS
} from '../types';

const initialState = {
  lugar: {},
  cargando: false,
  error: ''
};

export default function lugarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LUGAR_INICIO:
      return {
        ...state,
        error: '',
        cargando: true,
        lugar: {}
      };
    case FETCH_LUGAR_SUCCESS:
      return {
        ...state,
        cargando: false,
        lugar: action.payload
      };
    case FETCH_LUGAR_ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false
      };
    default:
      return state;
  }
}
