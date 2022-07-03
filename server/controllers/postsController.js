const express = require('express');
const asyncHandler = require('express-async-handler');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const createPost = asyncHandler(async (req, res) => {
  console.log(req.file.path);

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
  });

  await post.save();

  if (post) {
    res.status(200).json(post);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  //await Post.deleteMany({});
  const post = await Post.findById({ _id: req.params.id });
  console.log(post);

  if (!req.user) {
    res.status(401);
    throw new Error('You need to be logged in');
  }
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  //Make sure only the logged user matches the goal user

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await post.remove();
  res.status(200).json({ id: req.params.id });
});

const editPost = asyncHandler(async (req, res) => {});
const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Please log in');
  }
  if (req.user) {
    //console.log(req.user);
  }

  const postsByUser = await Post.find({ user: req.user.id });

  res.status(201).json(postsByUser);
});

module.exports = {
  createPost,
  deletePost,
  editPost,
  getMe,
};
