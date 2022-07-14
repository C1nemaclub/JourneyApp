const express = require('express');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

//* Craete post Route
const createPost = asyncHandler(async (req, res) => {
  if (req.user) {
  } else {
    res.status(401);
    throw new Error('You need to be logged in');
  }
  const { title, description, likes, location, cover } = req.body;

  if (!title || !description || likes == null || !location || !req.file.path) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const post = new Post({
    title: title,
    description: description,
    likes: likes,
    location: location,
    cover: req.file.path,
    user: req.user._id,
    userName: req.user.name,
    imageRef: req.body.imageRef,
  });

  await post.save();

  if (post) {
    res.status(200).json(post);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });

  if (!req.user) {
    res.status(401);
    throw new Error('You need to be logged in');
  }
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  //*Make sure only the logged user matches the goal user

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();
  res.status(200).json({ id: req.params.id });
});

const editPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.oldId);

  if (!req.user) {
    res.status(400);
    throw new Error('Please log in');
  }

  //*Make sure only the logged user matches the goal user

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  post.title = req.body.title;
  post.description = req.body.description;
  post.likes = req.body.likes;
  post.location = req.body.location;
  post.user = req.user._id;
  post.imageRef = req.body.imageRef,
  post.cover = req.file === undefined ? post.cover : req.file.path; //* If image wasnt sent, keep the same image

  await post.save();

  res.status(200).json({ id: req.body.oldId });
});
const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Please log in');
  }
  if (req.user) {
    //console.log(req.user);
  }

  const postsByUser = await Post.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(201).json(postsByUser);
});

const getAllRecentPosts = asyncHandler(async (req, res) => {
  const recentPosts = await Post.find({}).sort({ createdAt: -1 }).limit(20);
  res.status(200).json(recentPosts);
});

module.exports = {
  createPost,
  deletePost,
  editPost,
  getMe,
  getAllRecentPosts,
};
