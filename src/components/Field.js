import './Field.css';
import React, { useState, useEffect } from 'react';
import field from '../resources/field.jpg';

const Field = () => {
  return (
    <div className='Field'>
      <img src={field} alt='Field' />
    </div>
  );
};

export default Field;
