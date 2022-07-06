import React from 'react';
import PostForm from '../components/PostForm';
import { useLocation } from 'react-router-dom';

export default function EditPost() {
  const { state } = useLocation();
  const { post } = state;

  return (
    <div>
      <PostForm post={post} />
    </div>
  );
}
