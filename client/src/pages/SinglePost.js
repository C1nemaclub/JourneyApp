import React from 'react';
import PostForm from '../components/PostForm';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost, reset } from '../features/posts/postSlice';
import Header from '../components/Header';

export default function SinglePost() {
  const { state } = useLocation();
  const { post } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePostDelete(postId) {
    dispatch(deletePost(postId));
    navigate('/profile');
  }

  function handlePostEdit(post) {
    navigate('/edit', { state: { post: post } });
  }
  return (
    <div>
      <Header />
      SinglePost
      <h4>{post.title}</h4>
      <img src={`http://localhost:5000/${post.cover}`} alt='' />
      <div className='post-btns btns'>
        <button onClick={() => handlePostDelete(post._id)} key={post._id + 1}>
          Delete
        </button>
        <button onClick={() => handlePostEdit(post)}>Edit</button>
      </div>
    </div>
  );
}
