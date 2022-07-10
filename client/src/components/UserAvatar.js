import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatars from '../avatars';

export default function UserAvatar(props) {
  const { user } = useSelector((state) => state.auth);
  const [userAvatars, setUserAvatars] = useState(avatars);
  const currentAvatar = userAvatars.map((item) => {
    if (user.avatar === item.id) {
      return (
        <div className='avatar-container'>
          <img
            className='main-avatar'
            src={item.src}
            alt=''
            key={item.id}
            onClick={props.handleClick}
          />
        </div>
      );
    }
  });

  return <>{currentAvatar}</>;
}
