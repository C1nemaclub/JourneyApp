import React, { useState } from 'react';
import ReactDom from 'react-dom';
import avatars from '../avatars';
import AvatarGallery from './AvatarGallery';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../features/auth/authSlice';
import { FaWindowClose } from 'react-icons/fa';

export default function AvatarSelectionModal(props) {
  const { user } = useSelector((state) => state.auth);
  const [userAvatar, setUserAvatar] = useState(avatars);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const dispatch = useDispatch();

  function avatarSelection(id) {
    setUserAvatar((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          setSelectedAvatar(item);
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
    });
  }

  function changeAvatar() {
    const userData = {
      avatar: selectedAvatar.id,
      _id: user._id,
    };
    dispatch(editUser(userData));
  }

  const availableAvatars = userAvatar.map((item) => {
    return (
      <AvatarGallery
        current={user.avatar}
        key={item.id}
        image={item.src}
        selected={item.selected}
        handleClick={() => avatarSelection(item.id)}
        id={item.id}
      />
    );
  });

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

  return ReactDom.createPortal(
    <>
      <div style={overlay_style}></div>
      <div className='avatar-modal'>
        <div className='modal-title'>
          <h2> Avatar Selection</h2>
          <FaWindowClose onClick={props.handleClick} className='icon-close' />
        </div>
        <div className='modal-content'>
          <div className='avatars'>{availableAvatars}</div>
          <div className='modal-btn'>
            <button
              className='btn primary'
              onClick={() => {
                changeAvatar();
                props.handleClick();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
