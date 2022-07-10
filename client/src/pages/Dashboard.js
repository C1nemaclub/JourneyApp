import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset, getRecentUsers } from '../features/auth/authSlice';
import { getAllRecentPosts } from '../features/posts/postSlice';
import Loader from '../components/Loader';
import OtherUserCard from '../components/OtherUserCard';
import PostCard from '../components/PostCard';

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
    document.title = `${user.name}'s Dashboard`;
    dispatch(getRecentUsers());
    dispatch(getAllRecentPosts());
  }, []);

  const recentPostsElements = recentPosts.map((post) => {
    return (
      <>
        <PostCard
          key={post._id}
          title={post.title}
          image={post.cover}
          user={post.userName}
          location={post.location}
          description={post.description}
        />
        {/* <img src={`http://localhost:5000/${post.cover}`} /> */}
      </>
    );
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='dash-section'>
      <div className='main'>
        <div className='mid-col'>
          {user && <h2 className='dash-user'>{user.name}'s Dashboard</h2>}
          <h1 className='dash-title'>RECENT POSTS</h1>
          <div className='post-grid'>{recentPostsElements}</div>
        </div>
        <div className='right-col'>
          <h2>NEW TRAVELERS</h2>
          <OtherUserCard />
        </div>
      </div>
    </section>
  );
}
