import {
  USER_REGISTER_STARTED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from '../types';

const initialState = {
  loading: false,
  error: ''
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_STARTED:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
