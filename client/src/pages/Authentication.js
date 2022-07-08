import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Spline from '@splinetool/react-spline';
import AuthLinks from '../components/AuthLinks';

export default function Authentication() {
  return (
    <>
      <Router>
        {/* <AuthLinks /> */}
        <Spline
          className='spline'
          scene='https://prod.spline.design/X-nHbpqn39env0sx/scene.splinecode'
        />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
