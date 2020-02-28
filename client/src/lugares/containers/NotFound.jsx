import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container text-center mt-4'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='error-template'>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <h4 className='error-details mb-4'>Esa página no existe!</h4>
            <div className='error-actions'>
              <Link to='/' className='btn btn-primary btn-lg'>
                <span className='glyphicon glyphicon-home'></span>
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
