import axios from 'axios';
const API_URL = 'api/posts/';

const createPost = async (postData, token) => {
  console.log(postData);

  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    onUploadProgress: (progressEvent) => {
      console.log(
        'Upload Progress: ' +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          '%'
      );
    },
  };

  const response = await axios.post('api/posts/create/', postData, config);

  return response.data;
};

const getPosts = async (token) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    /*
    onUploadProgress: (progressEvent) => {
      console.log(
        'Upload Progress: ' +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          '%'
      );
    };*/
  };

  const response = await axios.get(API_URL + 'me', config);

  return response.data;
};

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete('api/posts/delete/' + postId, config);

  return response.data;
};

const editPost = async (postData, token) => {
  console.log(postData._id);

  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    'api/posts/edit/' + postData._id,
    postData,
    config
  );

  return response.data;
};

const getAllRecentPosts = async (token) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('api/posts/recent', config);

  return response.data;
};

const postService = {
  createPost,
  getPosts,
  deletePost,
  editPost,
  getAllRecentPosts,
};

export default postService;
