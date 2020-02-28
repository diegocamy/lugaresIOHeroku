import React from 'react';
import { Link } from 'react-router-dom';

const LugaresSubidos = ({ lugares }) => {
  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4'>
      {lugares.map(l => {
        return (
          <div key={l._id} className='col mb-4'>
            <div className='card'>
              <img
                src={l.foto}
                style={{ height: 250 }}
                className='card-img-top'
                alt={l.nombre}
              />
              <div className='card-body'>
                <h6 className='card-title text-truncate'>{l.nombre}</h6>
                <p className='card-text'>
                  <Link
                    to={`/lugar/${l._id}`}
                    className='btn btn-outline-success btn-sm'
                  >
                    Ver lugar
                  </Link>{' '}
                  <span className='mx-2 text-danger'>
                    {l.likes.length} <i className='far fa-heart'></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LugaresSubidos;
