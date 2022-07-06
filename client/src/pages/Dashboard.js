import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }
  return (
    <div>
      Dashboard
      <button onClick={onLogout}>Logout</button>
      {user && <h2>Welcome {user.name}</h2>}
    </div>
  );
}
