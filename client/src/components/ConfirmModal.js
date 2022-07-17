import React from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function ConfirmModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const overlay_style = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000,
  };

  if (!props.open) {
    return null;
  }

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  }

  return ReactDom.createPortal(
    <>
      <div style={overlay_style}></div>
      <div className='confirm-modal'>
        <h2>Are you sure you want to logout?</h2>
        <div className='buttons'>
          <button className='btn danger' onClick={props.handleClick}>
            Cancel
          </button>
          <button className='btn primary' onClick={onLogout}>
            Yes
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
