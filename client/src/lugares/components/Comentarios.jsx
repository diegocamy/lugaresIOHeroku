import React from 'react';
import foto from '../../img/profile.png';

const Comentarios = ({ comentarios }) => {
  if (comentarios.length === 0) {
    return (
      <div className='container mx-5 my-1'>
        <h4>No hay comentarios.</h4>
      </div>
    );
  }
  const comments = comentarios.map(c => {
    const Foto = c.foto ? c.foto : foto;
    return (
      <div className='container mx-5 my-1' key={c._id}>
        <div className='div'>
          <img
            src={Foto}
            alt='avatar'
            className='img-thumbnail float-left m-2'
            style={{ width: 100 }}
          />
        </div>
        <div
          className='bg-white text-left border p-1'
          style={{ minHeight: '100%' }}
        >
          <h5 className='text-dark m-1'>{c.nombreUsuario}</h5>
          <p className='text-break' style={{ lineHeight: 1.1 }}>
            {c.comentario}
          </p>
        </div>
      </div>
    );
  });

  return comments;
};

export default Comentarios;
