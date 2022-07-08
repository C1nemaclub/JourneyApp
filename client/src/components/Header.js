import React from 'react';
import { Link } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  return (
    <>
      <nav>
        <div className='logo'>
          <Link to='/'>Dashboard</Link>
        </div>
        <ul>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li className='logout-link' onClick={onLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
}
