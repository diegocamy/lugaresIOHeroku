import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../actions';

const { userRegister } = actions;

const Register = ({ history, userRegister, error, autenticado }) => {
  //redireccionar si el user esta autenticado
  if (autenticado) {
    history.push('/dashboard');
  }

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  const submitNewUser = e => {
    e.preventDefault();
    const nuevoUser = { nombreUsuario, password: pass, password2: pass2 };
    userRegister(nuevoUser, history);
  };

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {error}
    </div>
  );

  return (
    <div className='container mt-4'>
      {error && alertMessage}
      <div className='row justify-content-center'>
        <div className='col-md-7 col-lg-6 col-sm-10'>
          <div className='border p-4'>
            <h2 className='text-center mx-3 mb-3'>REGISTRARSE</h2>
            <form onSubmit={submitNewUser}>
              <div className='form-group'>
                <label htmlFor='nombreUsuario'>Nombre de Usuario</label>
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
                    type='text'
                    className='form-control'
                    id='nombreUsuario'
                    aria-describedby='nombreHelp'
                    placeholder='Usuario'
                    value={nombreUsuario}
                    onChange={e => {
                      setNombreUsuario(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Contraseña</label>
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
                    value={pass}
                    placeholder='*******'
                    onChange={e => {
                      setPass(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>
                  Repetir Contraseña
                </label>
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
                    id='exampleInputPassword2'
                    value={pass2}
                    placeholder='*******'
                    onChange={e => {
                      setPass2(e.target.value);
                    }}
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
    loading: state.register.loading,
    error: state.register.error
  };
};

export default withRouter(connect(mapStateToProps, { userRegister })(Register));
