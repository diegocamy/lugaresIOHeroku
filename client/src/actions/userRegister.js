import axios from 'axios';
import {
  USER_REGISTER_STARTED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from '../types';

export const userRegister = (usuarioNuevo, history) => dispatch => {
  dispatch(registerStarted());

  axios
    .post('/api/users/register', {
      nombreUsuario: usuarioNuevo.nombreUsuario,
      password: usuarioNuevo.password,
      password2: usuarioNuevo.password2
    })
    .then(res => {
      if (res.data.error) {
        dispatch(registerError(res.data.error));
      } else {
        dispatch(registerSuccess());
        history.push('/registrado');
      }
    })
    .catch(err => dispatch(registerError(err)));
};

const registerStarted = () => ({
  type: USER_REGISTER_STARTED
});

const registerSuccess = () => ({
  type: USER_REGISTER_SUCCESS
});

const registerError = error => ({
  type: USER_REGISTER_ERROR,
  payload: error
});
