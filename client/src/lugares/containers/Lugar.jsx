import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';
import actions from '../../actions';
import Comentarios from '../components/Comentarios';

const { fetchLugar, comentarLugar, likearLugar, borrarLugar } = actions;

const Lugar = props => {
  const [comentario, setComentario] = useState('');
  const { fetchLugar } = props;

  useEffect(() => {
    fetchLugar(props.match.params.id);
  }, [fetchLugar, props.match.params.id]);

  const marker = <Marker position={props.lugar.latlng}></Marker>;

  const enviarComentario = e => {
    e.preventDefault();
    props.comentarLugar(comentario, props.match.params.id);
    setComentario('');
  };

  const likearLugar = e => {
    props.likearLugar(props.match.params.id);
  };

  const eliminarLugar = e => {
    const confirmado = window.confirm(
      'Está seguro que desea eliminar este lugar?'
    );
    if (confirmado) {
      props.borrarLugar(props.match.params.id, props.history);
    }
  };

  //VERIFICAR SI EL USER HA DADO LIKE AL LUGAR
  const id = props.idUsuario;
  const haLikeado = props.lugar.latlng && props.lugar.likes.includes(id);

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.errorComentario}
    </div>
  );

  //FORM PARA ENVIAR COMENTARIOS
  const formComentario = (
    <div className='col'>
      <h3 className='my-2'>Comentarios</h3>
      {props.errorComentario && alertMessage}
      <form
        className='form-row justify-content-center'
        onSubmit={enviarComentario}
      >
        <div className='col-md-10'>
          <textarea
            className='form-control my-2'
            id='exampleFormControlTextarea1'
            rows='2'
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          />
        </div>
        <button className='btn btn-dark my-2'>Comentar</button>
      </form>
    </div>
  );

  if (props.cargando || props.cargandoComentario || props.cargandoBorrar) {
    return <Spinner />;
  }

  if (props.lugar.latlng) {
    return (
      <div className='bg-light'>
        <div className='container text-center py-2'>
          <h2 className='my-2 text-uppercase'>{props.lugar.nombre}</h2>
          <h5 className='my-2'>{props.lugar.descripcion}</h5>
          <div className='row mx-3'>
            <div className='col-md-6 col-sm-6 mx-auto'>
              <div className='row'>
                <div className='col'>
                  <h6 className='text-active'>
                    Compartido por:{' '}
                    <Link
                      to={`/profile/${props.lugar.usuario.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {props.lugar.usuario.nombreUsuario}
                    </Link>
                  </h6>
                  {props.lugar.idUsuario === props.idUsuario && (
                    <button
                      className='btn btn-danger btn-sm mb-2'
                      onClick={eliminarLugar}
                    >
                      Eliminar lugar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-6 mb-2 px-1' style={{ height: 350 }}>
              <img
                src={props.lugar.foto}
                alt='foto del lugar'
                className='rounded mx-auto'
                style={{ height: '100%', width: '95%' }}
              />
            </div>
            <div className='col-lg-6 mb-2'>
              <Mapa
                className='rounded'
                zoom={16}
                latlng={props.lugar.latlng}
                markers={marker}
              />
            </div>
          </div>
          <div className='col-md-6 mx-auto'>
            <div className='mx-2 my-2 h5'>
              {props.lugar.likes.length}{' '}
              <i className='fas fa-heart text-danger'></i>
            </div>
            {/* ESCONDER O MOSTRAR BOTON DE ME GUSTA */}
            {props.autenticado && (
              <button
                className={
                  haLikeado ? 'btn btn-outline-danger' : 'btn btn-danger'
                }
                onClick={likearLugar}
              >
                <i
                  className={haLikeado ? 'fas fa-heart-broken' : 'fas fa-heart'}
                ></i>{' '}
                {haLikeado ? 'Ya no me gusta' : 'Me gusta'}
              </button>
            )}
          </div>
          <div className='row'>
            {props.autenticado ? (
              formComentario
            ) : (
              <div className='text-center my-3 mx-auto'>
                <h3>Debes iniciar sesión para comentar</h3>
              </div>
            )}
            <Comentarios comentarios={props.lugar.comentarios} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = state => {
  return {
    autenticado: state.auth.autenticado,
    idUsuario: state.auth.user.id,
    lugar: state.lugar.lugar,
    error: state.lugar.error,
    cargando: state.lugar.cargando,
    cargandoComentario: state.comentario.cargando,
    cargandoBorrar: state.borrarLugar.cargando,
    errorComentario: state.comentario.error,
    cargandoLike: state.like.cargando
  };
};

export default connect(mapStateToProps, {
  fetchLugar,
  comentarLugar,
  likearLugar,
  borrarLugar
})(Lugar);
