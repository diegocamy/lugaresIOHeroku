import React, { createRef, useState, useEffect } from 'react';
import { Map as Mapita, TileLayer, Marker } from 'react-leaflet';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from '../components/Spinner';
import actions from '../../actions';

const { compartirLugar } = actions;

const NuevoLugar = props => {
  useEffect(() => {
    if (!props.autenticado) {
      props.history.push('/login');
    }
  }, [props.autenticado, props.history]);

  const [hasLocation, setHasLocation] = useState(true);
  const [latlng, setLatlng] = useState({ lat: -30.90534, lng: -55.55076 });
  const [zoom, setZoom] = useState(5);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState('');

  const mapRef = createRef(Mapita);

  const handleClick = e => {
    const map = mapRef.current;
    if (map != null) {
      const zoom = e.target._zoom;
      setHasLocation(true);
      setLatlng(e.latlng);
      setZoom(zoom);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('fotoLugar', foto);
    data.append('nombre', nombre);
    data.append('lat', latlng.lat);
    data.append('lng', latlng.lng);
    data.append('descripcion', descripcion);

    props.compartirLugar(data, props.history);
  };

  const marker = hasLocation ? <Marker position={latlng}></Marker> : null;

  if (props.compartiendo) {
    return <Spinner />;
  }

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.error}
    </div>
  );

  return (
    <div className='container'>
      <div className='row'>
        <div className='col text-center mt-2'>
          {props.error && alertMessage}
          <h2>Ingresar Nuevo Lugar</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 col-lg-6 mt-2 mx-auto'>
          <Mapita
            className='map'
            style={{ height: 350 }}
            center={latlng}
            length={4}
            onClick={handleClick}
            ref={mapRef}
            zoom={zoom}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {marker}
          </Mapita>
        </div>
        <div className='col-md-6 col-lg-6 mt-2'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='nombreLugar'>Nombre del Lugar</label>
              <input
                type='text'
                name='nombre'
                className='form-control'
                id='nombreLugar'
                aria-describedby='nombreLugar'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='descripcion'>Descripcion</label>
              <textarea
                type='text'
                name='descripcion'
                className='form-control'
                id='descripcion'
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='foto'>Foto</label>
              <input
                type='file'
                className='form-control-file'
                id='foto'
                onChange={e => setFoto(e.target.files[0])}
              />
            </div>
            <button className='btn btn-primary btn btn-large'>Compartir</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    compartiendo: state.compartirLugar.compartiendo,
    error: state.compartirLugar.error,
    autenticado: state.auth.autenticado
  };
};

export default withRouter(
  connect(mapStateToProps, { compartirLugar })(NuevoLugar)
);
