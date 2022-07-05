import '../styles/Spinner.css';

import React from 'react';

export default function Spinner() {
  return (
    <div className='spinner'>
      <div className='set1'>
        <div className='ball'></div>
        <div className='ball'></div>
      </div>
      <div className='set2'>
        <div className='ball'></div>
        <div className='ball'></div>
      </div>
    </div>
  );
}
