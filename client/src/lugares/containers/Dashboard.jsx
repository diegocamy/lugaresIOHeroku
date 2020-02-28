import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../actions';
import fotoPerfil from '../../img/profile.png';
import LugaresSubidos from '../components/LugaresSubidos';
import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';

const { fetchProfile } = actions;

const Dashboard = props => {
  //cargar datos del user logeado
  const { fetchProfile } = props;
  useEffect(() => {
    if (!props.autenticado) {
      props.history.push('/login');
    } else {
      fetchProfile(props.idLogeado);
    }
  }, [props.autenticado, props.history, fetchProfile, props.idLogeado]);

  const latlng = {
    lat: -30.90534,
    lng: -55.55076
  };

  //spinner
  if (props.cargando) {
    return <Spinner />;
  }

  if (props.error) {
    return (
      <div className='text-center my-5'>
        <h2>{props.error}</h2>
        <Link to='/'>
          <button className='btn btn-primary'>Inicio</button>
        </Link>
      </div>
    );
  }

  //marcadores de los lugares subidos por el usuario
  const markers = props.lugares.map(l => {
    return (
      <Marker key={l._id} position={l.latlng}>
        <Popup>
          <div className='container text-center'>
            <h6>{l.nombre}</h6>
            <Link to={`/lugar/${l._id}`}>
              <button className='btn btn-sm btn-dark'>Ver lugar</button>
            </Link>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className='bg-light pb-4'>
      <div className='container'>
        <div className='row'>
          <div className='col my-2 mx-1 p-2 bg-white rounded-top'>
            <span className='h3 mx-2'>Perfil</span>
            <Link to='/edit-profile'>
              <button className='btn btn-dark btn-sm float-right mx-1'>
                Editar Perfil
              </button>
            </Link>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3 col-lg-2 col-xl-2 text-center bg-white mx-1 p-1 mb-2'>
            <h5>{props.user.nombreUsuario}</h5>
            <img
              className='rounded mx-auto img-fluid mb-4'
              src={props.user.foto ? props.user.foto : fotoPerfil}
              alt='foto de perfil'
            />
            <h6>{props.user.nombre}</h6>
            <h6>{props.user.ciudad}</h6>
            <h6>{props.user.pais}</h6>
          </div>
          <div className='col text-center bg-white mx-1 mb-2'>
            <h3 className='mt-2'>LUGARES COMPARTIDOS</h3>
            <Mapa zoom={1} latlng={latlng} markers={markers} />
            <Link className='mx-auto text-center' to='/add-place'>
              <button className='btn btn-danger btn-lg mx-1 my-2'>
                Compartir un Lugar Nuevo
              </button>
            </Link>
            <LugaresSubidos lugares={props.lugares} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    idLogeado: state.auth.user.id,
    autenticado: state.auth.autenticado,
    user: state.userProfile.user,
    error: state.userProfile.error,
    lugares: state.userProfile.lugares,
    cargando: state.userProfile.cargando
  };
};

export default connect(mapStateToProps, { fetchProfile })(Dashboard);
