import React from 'react';

const Spinner = () => {
  return (
    <div className='my-5 d-flex justify-content-center'>
      <div
        className='spinner-border text-primary'
        style={{ width: ' 3rem', height: '3rem' }}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;