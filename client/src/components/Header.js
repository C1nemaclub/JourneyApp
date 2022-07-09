import React from 'react';
import { Link } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
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
        <ul>
          <UserAvatar />
          <h3 className='name'>{user.name}</h3>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
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
