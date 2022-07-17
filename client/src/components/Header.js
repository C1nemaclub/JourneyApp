import React, { useState, useContext } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import {
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import AvatarSelectionModal from './AvatarSelectionModal.js';
import ConfirmModal from './ConfirmModal.js';
import { ThemeContext } from '../App';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [menuState, setMenuState] = useState(false);
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let condStyle;

  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/register'
  ) {
    condStyle = {
      display: 'none',
    };
  }

  function CustomLink({ to, children, ...props }) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvePath.pathname, end: true });
    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  }

  const theme = useContext(ThemeContext);
  function setMode() {
    theme.toggleTheme();
    setDark((prev) => !prev);
  }

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
      {menuState ? (
        <FiX className='menu-icon' onClick={openMenu} />
      ) : (
        <FiMenu className='menu-icon' onClick={openMenu} />
      )}
      <nav style={{ left: menuState ? '0%' : '' }}>
        <ul>
          <UserAvatar handleClick={() => setIsOpen(true)} />
          <h3 className='name'>{user.name}</h3>
          <li>
            <CustomLink to='/' className='link'>
              <FaNewspaper className='icon' />
              <div className='text'>Dashboard</div>
            </CustomLink>
          </li>
          <li>
            <CustomLink to='/profile' className='link'>
              <FaUser className='icon' />
              <div className='text'>Profile</div>
            </CustomLink>
          </li>
          <li className='logout-link ' onClick={onLogout}>
            <div className='link'>
              <FaSignOutAlt className='icon' />
              <div className='text'>Logout</div>
            </div>
          </li>
          {dark ? (
            <li className='logout-link light' onClick={setMode}>
              <div className='link'>
                <FaSun className='icon' />
                <div className='text'>Light Mode</div>
              </div>
            </li>
          ) : (
            <li className='logout-link dark' onClick={setMode}>
              <div className='link'>
                <FaMoon className='icon' />
                <div className='text'>Dark Mode</div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
