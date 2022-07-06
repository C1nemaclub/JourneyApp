import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getPosts, deletePost, reset } from '../features/posts/postSlice';

export default function Profile() {
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

    if (!user) {
      navigate('/login');
    }

    dispatch(getPosts());
  }, [user, navigate, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
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

  return (
    <>
      <h3>{user.name}</h3>
      <h3>{user.email}</h3>
      <button onClick={handlecreatePost}>Agregar</button>
      <h3>{posts.length}</h3>
      {postElements}
    </>
  );
}
