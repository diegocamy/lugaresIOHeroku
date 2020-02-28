import React from 'react';
import Lugar from './Lugar';

const ListaLugares = ({ lugares }) => {
  if (lugares.length === 0) {
    return <h1>No hay lugares para mostrar</h1>;
  }

  return (
    <div className='container'>
      <div className='row'>
        {lugares.map(lugar => {
          return (
            <Lugar
              key={lugar._id}
              id={lugar._id}
              idUsuario={lugar.usuario.id}
              subidoPor={lugar.usuario.nombreUsuario}
              nombre={lugar.nombre}
              foto={lugar.foto}
              likes={lugar.likes.length}
              descripcion={lugar.descripcion}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListaLugares;
