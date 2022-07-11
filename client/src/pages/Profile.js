import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost, reset } from '../features/posts/postSlice';
import Loader from '../components/Loader';
import { FaPlusCircle } from 'react-icons/fa';
import PostCard from '../components/PostCard';
import AvatarSelectionModal from '../components/AvatarSelectionModal';
import { toast } from 'react-toastify';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      //console.log(message);
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
          alt='post'
          key={post._id}
          onClick={() => handlePost(post)}
        />
      </>
    );
  });

  const postCards = posts.map((post, index) => {
    return (
      <PostCard
        key={post._id}
        cover={post.cover}
        title={post.title}
        location={post.location}
        description={post.description}
        user={post.userName}
        handleClick={() => handlePost(post)}
      />
    );
  });

  return (
    <div className='profile-main'>
      <div className='profile-content'>
        <div className='top'>
          <h2 className='profile-title'>{user.name}'s Profile</h2>
          <div className='info'>
            <div className='name flex'>
              <h2>Name: </h2>
              <h3>{user.name}</h3>
            </div>
            <div className='email flex'>
              <h2>Email: </h2>
              <h3>{user.email}</h3>
            </div>
          </div>
          <p onClick={() => setIsOpen(true)}>Change Avatar</p>
          <AvatarSelectionModal
            open={isOpen}
            handleClick={() => setIsOpen(false)}
          />
          {/* <button className='btn avatar-btn primary'>Change Avatar</button> */}
          <h1>
            YOUR POSTS <small>({posts.length})</small>{' '}
          </h1>
          <button onClick={handlecreatePost} className='btn primary post-btn'>
            <FaPlusCircle />
            New Post
          </button>
        </div>
        <div className='post-grid'>{postCards}</div>
      </div>
    </div>
  );
}
