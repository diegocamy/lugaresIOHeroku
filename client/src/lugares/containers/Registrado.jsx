import React from 'react';
import { Link } from 'react-router-dom';

const Registrado = () => {
  return (
    <div className='container text-center'>
      <h2 className='m-3'>Usuario registrado con éxito!</h2>
      <Link to='/login'>
        <button className='btn btn-primary m-3'>Ingresar</button>
      </Link>
    </div>
  );
};

export default Registrado;
