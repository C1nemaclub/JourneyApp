import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost, reset } from '../features/posts/postSlice';
import { editUser } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import avatars from '../avatars';
import AvatarGallery from '../components/AvatarGallery';

export default function Profile() {
  const [userAvatar, setUserAvatar] = useState(avatars);
  const [seeAvatars, setSeeAvatars] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    /*
    if (!user) {
      navigate('/login');
    }*/

    document.title = `${user.name}'s Profile`;
    dispatch(getPosts());
  }, [user, navigate, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  function handlePost(post) {
    navigate('/post', { state: { post: post } });
  }

  function handlecreatePost() {
    navigate('/create');
  }

  const postElements = posts.map((post, index) => {
    return (
      <>
        <img
          src={`http://localhost:5000/${post.cover}`}
          alt='image'
          key={post._id}
          onClick={() => handlePost(post)}
        />
      </>
    );
  });

  function changeAvatar() {
    const userData = {
      avatar: selectedAvatar.id,
      _id: user._id,
    };
    setSeeAvatars(false);
    dispatch(editUser(userData));
  }

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

  const currentAvatar = userAvatar.map((item) => {
    if (user.avatar === item.id) {
      return <img className='avatar' src={item.src} alt='' key={item.id} />;
    }
  });

  const allAvatars = userAvatar.map((item) => {
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

  function avAvatars() {
    setSeeAvatars((prev) => !prev);
  }

  return (
    <>
      {currentAvatar}
      {seeAvatars && allAvatars}
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      <button onClick={avAvatars}>Change Avatar</button>
      <button onClick={changeAvatar}>Edit Avatar</button>
      <button onClick={handlecreatePost}>Agregar</button>
      <h3>{posts.length}</h3>
      {postElements}
    </>
  );
}
