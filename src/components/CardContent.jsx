import React from 'react';
import { LoginForm } from '../components';

const CardContent = () => {
  return (
    <div className='mb-3 mt-4'>
      <h2 className='fw-bold mb-4 text-uppercase'>TODO APP</h2>

      <div className='mb-3'>
        <LoginForm />
      </div>
    </div>
  );
};

export default CardContent;
