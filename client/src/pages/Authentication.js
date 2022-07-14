import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Spline from '@splinetool/react-spline';
import '../styles/Login.css';

export default function Authentication() {
  const [showCanvas, setShowCanvas] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowCanvas(false);
    } else {
      setShowCanvas(true);
    }
  }, [showCanvas]);

  return (
    <>
      <Router>
        {showCanvas && (
          <Spline
            className='spline'
            scene='https://prod.spline.design/X-nHbpqn39env0sx/scene.splinecode'
          />
        )}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
