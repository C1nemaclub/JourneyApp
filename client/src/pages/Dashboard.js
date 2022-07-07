import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset, getRecentUsers } from '../features/auth/authSlice';
import { getAllRecentPosts } from '../features/posts/postSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';

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
      navigate('/login');
    }
  }, [user]);

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }
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

  return (
    <div>
      <Header />
      Dashboard
      <button onClick={onLogout}>Logout</button>
      {user && <h2>Welcome {user.name}</h2>}
      {recentUserElements}
      {recentPostsElements}
    </div>
  );
}
