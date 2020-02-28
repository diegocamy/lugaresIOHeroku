import {
  FETCH_TODOS_LUGARES_INICIO,
  FETCH_TODOS_LUGARES_SUCCESS,
  FETCH_TODOS_LUGARES_ERROR
} from '../types';

const initialState = {
  cargando: false,
  lugares: [],
  error: ''
};

export default function fetchTodosLosLugaresReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_TODOS_LUGARES_INICIO:
      return {
        ...state,
        cargando: true
      };
    case FETCH_TODOS_LUGARES_SUCCESS:
      return {
        ...state,
        cargando: false,
        lugares: action.payload,
        error: ''
      };
    case FETCH_TODOS_LUGARES_ERROR:
      return {
        ...state,
        cargando: false,
        lguares: [],
        error: action.payload
      };
    default:
      return state;
  }
}
