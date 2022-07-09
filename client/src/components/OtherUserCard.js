import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import avatars from '../avatars';

export default function OtherUserCard() {
  const [userAvatars, setUserAvatars] = useState(avatars);
  const { recentUsers } = useSelector((state) => state.auth);

  const userCard = recentUsers.map((user) => {
    return (
      <div key={user._id} className='user-card'>
        <h3 className='user-name'>{user.name}</h3>
        {userAvatars.map((avatar) => {
          if (user.avatar === avatar.id) {
            return <img src={avatar.src} alt='avatar' className='avatar' />;
          }
        })}
      </div>
    );
  });

  return <>{userCard}</>;
}
