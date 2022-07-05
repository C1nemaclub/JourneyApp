import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onLogout() {
    console.log('Hello');

    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }
  return (
    <div>
      Dashboard
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
