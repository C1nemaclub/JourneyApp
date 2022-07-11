import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export default function RouteSelector() {
  const location = useLocation();

  const selStyle = {
    top:
      location.pathname === '/'
        ? '35.6%'
        : '' || location.pathname === '/profile'
        ? '40.6%'
        : '',
    opacity: location.pathname === '/' ? '35.6%' : '',
  };

  return <div className='selector' style={selStyle}></div>;
}
