import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { FaNewspaper, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import AvatarSelectionModal from './AvatarSelectionModal.js';
import RouteSelector from '../components/RouteSelector';

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const [menuState, setMenuState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <RouteSelector />
        </ul>
      </nav>
    </>
  );
}
