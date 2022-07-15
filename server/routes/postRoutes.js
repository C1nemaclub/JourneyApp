const express = require('express');
const multer = require('multer');
const Post = require('../models/postsModel');

const router = express.Router();
const { upload } = require('../middleware/imageHandler');
const { protectRoute } = require('../middleware/authhandler');
const {
  createPost,
  deletePost,
  editPost,
  getMe,
  getAllRecentPosts,
} = require('../controllers/postsController');

router.post('/create', protectRoute, createPost);
router.delete('/delete/:id', protectRoute, deletePost);
router.put('/edit/:id', protectRoute, editPost);
router.get('/me', protectRoute, getMe);
router.get('/recent', protectRoute, getAllRecentPosts);

module.exports = router;
