import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import FullPostView from '../components/FullPostView';

import '../styles/ViewPost.css';

export default function SinglePost() {
  const { state } = useLocation();
  const { post } = state;
  const [info, setInfo] = useState(post);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePostDelete(postId) {
    dispatch(deletePost(postId));
    navigate('/profile');
    toast.success('Post deleted successfully');
  }

  function handlePostEdit(post) {
    navigate('/edit', { state: { post: post } });
  }

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function handleModal() {
    console.log(info);
    setInfo(post);
  }

  return (
    <div className='view-post-main'>
      <FullPostView open={isOpen} handleClose={closeModal} info={post} />
      <div className='view-card'>
        <div className='flex-container'>
          <div className='left-col-view'>
            <h4 className='title-header'>{post.title}</h4>
            <img
              // src={`http://localhost:5000/${post.cover}`}
              src={`https://firebasestorage.googleapis.com/v0/b/uploadingimage-71d87.appspot.com/o/images%2F${post.imageRef}?alt=media&token=3888e9f7-7d66-4d72-b542-300c16d2a3c5`}
              className='post-img'
              alt=''
              onClick={(post) => {
                openModal();
                handleModal(post);
              }}
            />

            <div className='buttons'>
              <div className='top'>
                <button
                  onClick={() => handlePostEdit(post)}
                  className='primary btn'
                >
                  Edit
                </button>
              </div>
              <div className='bottom'>
                <button onClick={() => navigate(-1)} className='danger btn'>
                  Cancel
                </button>
                <button
                  onClick={() => handlePostDelete(post._id)}
                  key={post._id + 1}
                  className='btn danger delete-btn'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className='right-col-view'>
            <div className='user flex'>
              <h2>Posted by: </h2>
              <h3>{post.userName}</h3>
            </div>
            <div className='location flex'>
              <h2>Location: </h2>
              <h3>{post.location}</h3>
            </div>
            <div className='date flex'>
              <h2>Publish Date: </h2>
              <h3>{post.createdAt}</h3>
            </div>
            <div className='description flex'>
              <h2>Description: </h2>
              <h3>{post.description}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
