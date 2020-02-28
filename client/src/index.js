import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import rootReducer from './reducers';
import App from './App';
import { setAuthorizationToken, checkearSiTokenEsValido } from './utils/utils';
import { guardarUserEnStore } from './actions/userLogin';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(checkearSiTokenEsValido, thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(guardarUserEnStore(jwt.decode(localStorage.getItem('token'))));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
