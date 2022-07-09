import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import avatars from '../avatars';

export default function UserAvatar() {
  const { user } = useSelector((state) => state.auth);
  const [userAvatars, setUserAvatars] = useState(avatars);
  const currentAvatar = userAvatars.map((item) => {
    if (user.avatar === item.id) {
      return <img className='avatar' src={item.src} alt='' key={item.id} />;
    }
  });

  return <>{currentAvatar}</>;
}
