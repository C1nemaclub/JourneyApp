import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { FaNewspaper, FaSignOutAlt, FaUser, FaUserCog } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import AvatarSelectionModal from './AvatarSelectionModal.js';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [menuState, setMenuState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  function openMenu(e) {
    setMenuState((prev) => !prev);
  }

  return (
    <>
      <AvatarSelectionModal
        handleClick={() => setIsOpen(false)}
        open={isOpen}
      />
      <nav>
        {menuState ? (
          <FiX className='menu-icon' onClick={openMenu} />
        ) : (
          <FiMenu className='menu-icon' onClick={openMenu} />
        )}
        <ul style={{ left: menuState ? '0%' : '' }}>
          <UserAvatar handleClick={() => setIsOpen(true)} />
          <h3 className='name'>{user.name}</h3>
          <li>
            <Link to='/'>
              <FaNewspaper className='icon' /> Dashboard
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              <FaUser /> Profile
            </Link>
          </li>
          <li className='logout-link' onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </>
  );
}
