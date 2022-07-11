import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset, getRecentUsers } from '../features/auth/authSlice';
import { getAllRecentPosts } from '../features/posts/postSlice';
import Loader from '../components/Loader';
import OtherUserCard from '../components/OtherUserCard';
import PostCard from '../components/PostCard';
import { toast } from 'react-toastify';
import FullPostView from '../components/FullPostView';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const { recentUsers } = useSelector((state) => state.auth);

  const { recentPosts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (!user) {
      dispatch(logout());
      navigate('/');
    }
    if (isError) {
      toast.error(message);
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
          cover={post.cover}
          user={post.userName}
          location={post.location}
          description={post.description}
          //handleClick={() => openModal()}
          handleClick={openModal}
          handleModal={handleModal}
        />
        {/* <img src={`http://localhost:5000/${post.cover}`} /> */}
      </>
    );
  });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [info, setInfo] = useState(null);
  function handleModal(post) {
    setInfo(post);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='dash-section'>
      <FullPostView open={isOpen} handleClose={closeModal} info={info} />
      <div className='main'>
        <div className='mid-col'>
          <div className='top'>
            {user && <h2 className='dash-user'>{user.name}'s Dashboard</h2>}
            <h1 className='dash-title'>RECENT POSTS</h1>
          </div>
          <div className='post-grid dash-grid'>{recentPostsElements}</div>
        </div>
        <div className='right-col'>
          <h2>NEW TRAVELERS</h2>
          <OtherUserCard />
        </div>
      </div>
    </section>
  );
}
