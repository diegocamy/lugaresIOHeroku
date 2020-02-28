import React from 'react';
import { Link } from 'react-router-dom';

const Lugar = ({ nombre, foto, likes, subidoPor, id, idUsuario }) => {
  return (
    <div className='col-md-6 col-sm col-lg-4 my-3'>
      <div className='card mx-auto' style={{ width: 300 }}>
        <img
          src={foto}
          className='card-img-top'
          alt={nombre}
          style={{ height: 250 }}
        />
        <div className='card-body'>
          <h5 className='card-title text-truncate'>{nombre}</h5>
          <p className='card-text'>
            By: <Link to={`/profile/${idUsuario}`}>{subidoPor}</Link>
          </p>
          <Link to={`/lugar/${id}`} className='btn btn-outline-success btn-sm'>
            Ver lugar
          </Link>{' '}
          <span className='mx-2 text-danger'>
            {likes} <i className='far fa-heart'></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lugar;
