import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../actions';

const { login } = actions;

const Login = props => {
  //si el usuario esta autenticado es redireccionado a su perfil

  useEffect(() => {
    if (props.autenticado) {
      props.history.push('/dashboard');
    }
  }, [props.autenticado, props.history]);

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = e => {
    e.preventDefault();
    const loginInfo = { nombreUsuario, password };
    props.login(loginInfo, props.history);
  };

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.error}
    </div>
  );

  return (
    <div className='container mt-4'>
      {props.error && alertMessage}
      <div className='row justify-content-center'>
        <div className='col-md-7 col-lg-6 col-sm-10'>
          <div className='border p-4'>
            <h2 className='text-center mx-3 mb-3'>INICIAR SESIÓN</h2>

            <form onSubmit={submitLogin} className='w-75 mx-auto'>
              <div className='form-group'>
                <label htmlFor='exampleInputnombreUsuario1'>
                  Nombre de Usuario
                </label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='validationTooltipUsernamePrepend'
                    >
                      <i className='fas fa-user'></i>
                    </span>
                  </div>
                  <input
                    type='nombreUsuario'
                    className='form-control'
                    id='exampleInputnombreUsuario1'
                    aria-describedby='nombreUsuarioHelp'
                    placeholder='Usuario'
                    value={nombreUsuario}
                    onChange={e => setNombreUsuario(e.target.value)}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='validationTooltipUsernamePrepend'
                    >
                      <i className='fas fa-lock'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                    placeholder='********'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary w-75'>Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    autenticado: state.auth.autenticado,
    error: state.auth.error
  };
};

export default withRouter(connect(mapStateToProps, { login })(Login));
