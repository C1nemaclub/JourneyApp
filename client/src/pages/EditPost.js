import React from 'react';
import PostForm from '../components/PostForm';
import { useLocation } from 'react-router-dom';

export default function EditPost() {
  const { state } = useLocation();
  const { post } = state;

  return (
    <div className='profile-main'>
      <PostForm post={post} />
    </div>
  );
}
