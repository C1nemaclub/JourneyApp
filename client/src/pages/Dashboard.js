import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset, getRecentUsers } from '../features/auth/authSlice';
import { getAllRecentPosts } from '../features/posts/postSlice';
import Loader from '../components/Loader';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { recentUsers } = useSelector((state) => state.auth);

  const { recentPosts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    dispatch(getRecentUsers());
    dispatch(getAllRecentPosts());
  }, []);

  const recentPostsElements = recentPosts.map((post) => {
    return (
      <>
        <img src={`http://localhost:5000/${post.cover}`} />
      </>
    );
  });

  const recentUserElements = recentUsers.map((user) => {
    return <p key={user._id}>{user.email}</p>;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      Dashboard
      {user && <h2>Welcome {user.name}</h2>}
      {recentUserElements}
      {recentPostsElements}
    </div>
  );
}
