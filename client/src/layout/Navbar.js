import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../actions';

const { logout } = actions;

const Navbar = props => {
  const noLogeado = (
    <ul className='navbar-nav ml-auto'>
      <Link to='/register'>
        <button className='btn btn-dark m-1'>Registrarse</button>
      </Link>

      <Link to='/login'>
        <button className='btn btn-light m-1'>Ingresar</button>
      </Link>
    </ul>
  );

  const logeado = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item my-auto mx-1 text-white'>{props.user}</li>

      <button
        className='btn btn-light m-1'
        onClick={() => props.logout(props.history)}
      >
        Salir
      </button>
    </ul>
  );

  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark bg-primary'
      style={{ minHeight: '10%' }}
    >
      <Link className='navbar-brand' to='/'>
        LUGARES.IO
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarColor01'
        aria-controls='navbarColor01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarColor01'>
        <ul className='navbar-nav mr-auto'>
          {props.autenticado ? (
            <li className='nav-item'>
              <Link className='nav-link' to='/dashboard'>
                Perfil
              </Link>
            </li>
          ) : null}
          <li className='nav-item'>
            <Link className='nav-link' to='/lugares'>
              Lugares
            </Link>
          </li>
        </ul>
        {props.autenticado ? logeado : noLogeado}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    autenticado: state.auth.autenticado,
    user: state.auth.user.nombreUsuario
  };
};

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
