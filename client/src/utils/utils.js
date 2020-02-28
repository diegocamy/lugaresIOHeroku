import axios from 'axios';
import jwt from 'jsonwebtoken';

import { TOKEN_EXPIRED, LIMPIAR_DATOS_USER } from '../types';

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const checkearSiTokenEsValido = store => next => action => {
  const token = localStorage.getItem('token');
  if (token) {
    const exp = jwt.decode(token).exp;
    if (Date.now() > exp * 1000) {
      localStorage.clear();
      next({ type: TOKEN_EXPIRED });
      setTimeout(() => {
        next({ type: LIMPIAR_DATOS_USER });
      }, 500);
    }
  }

  next(action);
};
