import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import actions from '../../actions';
import Spinner from '../components/Spinner';

const { editarPerfil, borrarUsuario } = actions;

const EditarPerfil = props => {
  useEffect(() => {
    if (!props.autenticado) {
      props.history.push('/login');
    }
  }, [props.autenticado, props.history]);

  const {
    nombre: nombreUser,
    pais: paisUser,
    ciudad: ciudadUser,
    foto: fotoUser
  } = props.datosUsuario;

  const [nombre, setNombre] = useState(nombreUser || '');
  const [pais, setPais] = useState(paisUser || '');
  const [ciudad, setCiudad] = useState(ciudadUser || '');
  const [foto, setFoto] = useState(fotoUser || '');

  const submitNewUser = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('foto', foto);
    data.append('pais', pais);
    data.append('ciudad', ciudad);
    data.append('nombre', nombre);
    props.editarPerfil(data, props.history);
  };

  const eliminarPerfil = e => {
    const eliminar = window.confirm('Está seguro de eliminar su perfil?');
    if (eliminar) {
      props.borrarUsuario(props.history);
    }
  };

  if (props.actualizando || props.cargandoBorrar) {
    return <Spinner />;
  }

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.error}
    </div>
  );

  return (
    <div className='container mt-4'>
      {props.error && alertMessage}
      <div className='row justify-content-center'>
        <div className='col-md-6 mx-auto'>
          <form onSubmit={submitNewUser} className='mx-auto'>
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                className='form-control'
                id='nombre'
                aria-describedby='nombreHelp'
                value={nombre}
                onChange={e => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Ciudad'>Ciudad</label>
              <input
                type='text'
                className='form-control'
                id='Ciudad'
                aria-describedby='CiudadHelp'
                value={ciudad}
                onChange={e => {
                  setCiudad(e.target.value);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='pais'>Pais</label>
              <input
                type='text'
                className='form-control'
                id='pais'
                aria-describedby='paisHelp'
                value={pais}
                onChange={e => {
                  setPais(e.target.value);
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='Foto'>Foto</label>
              <input
                type='file'
                className='form-control'
                id='Foto'
                aria-describedby='FotoHelp'
                onChange={e => {
                  setFoto(e.target.files[0]);
                }}
              />
            </div>
          </form>
          <div className='div text-center'>
            <button className='btn btn-primary m-1' onClick={submitNewUser}>
              Guardar Cambios
            </button>
            <button className='btn btn-danger m-1' onClick={eliminarPerfil}>
              Eliminar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    actualizando: state.updateUserData.actualizando,
    autenticado: state.auth.autenticado,
    error: state.updateUserData.error,
    datosUsuario: state.userProfile.user,
    cargandoBorrar: state.borrarUser.cargando,
    errorBorrar: state.borrarUser.error
  };
};

export default withRouter(
  connect(mapStateToProps, { editarPerfil, borrarUsuario })(EditarPerfil)
);
