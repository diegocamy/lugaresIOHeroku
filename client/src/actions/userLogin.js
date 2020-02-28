import axios from 'axios';
import jwt from 'jsonwebtoken';

import { USER_LOGIN_ERROR, SET_USUARIO_ACTUAL, USER_LOGOUT } from '../types';
import { setAuthorizationToken } from '../utils/utils';

export const guardarUserEnStore = usuario => {
  const user = {
    ...usuario
  };
  return {
    type: SET_USUARIO_ACTUAL,
    user
  };
};

const setErrorLogin = error => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error
  };
};

export const login = ({ nombreUsuario, password }, history) => dispatch => {
  axios
    .post('/api/users/login', {
      nombreUsuario,
      password
    })
    .then(res => {
      //extraer token de la respuesta del server
      const token = res.data.token;
      //guardar token en local storage
      localStorage.setItem('token', token);
      //agregar authorization header a axios
      setAuthorizationToken(token);
      //decodificar token y guardarlo en store
      dispatch(guardarUserEnStore(jwt.decode(token)));
      //redireccionar a la pagina de perfil
      history.push('/dashboard');
    })
    .catch(err => {
      if (err) dispatch(setErrorLogin(err.response.data.error));
    });
};

export const logout = history => dispatch => {
  //eliminar token de localStorage
  localStorage.removeItem('token');
  //dispatch accion para eliminar user en store
  dispatch({ type: USER_LOGOUT });
  //redireccionar a la pagina de login
  history.push('/login');
};

export const jwtExpiredLogout = () => dispatch => {
  //eliminar token de localStorage
  localStorage.removeItem('token');
  //dispatch accion para eliminar user en store
  dispatch({ type: USER_LOGOUT });
};
