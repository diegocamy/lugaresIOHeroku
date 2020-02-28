import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import fotoPerfil from '../../img/profile.png';
import Spinner from '../components/Spinner';
import Mapa from '../components/Mapa';
import LugaresSubidos from '../components/LugaresSubidos';

const { fetchProfile } = actions;

const Profile = props => {
  //cargar datos del perfil
  const userId = props.match.params.userId;

  //si el id del usuario que se busca es igual al id del usuario logeado
  //redireccionar a dashboard
  if (userId === props.userLogeado) {
    props.history.push('/dashboard');
  }

  const { fetchProfile } = props;

  useEffect(() => {
    fetchProfile(userId);
  }, [fetchProfile, userId]);

  const latlng = {
    lat: -30.90534,
    lng: -55.55076
  };

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
            <LugaresSubidos lugares={props.lugares} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userProfile.user,
    error: state.userProfile.error,
    lugares: state.userProfile.lugares,
    cargando: state.userProfile.cargando,
    userLogeado: state.auth.user.id
  };
};

export default connect(mapStateToProps, { fetchProfile })(Profile);
