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
} = require('../controllers/postsController');

router.post('/create', upload.single('file'), protectRoute, createPost);
router.delete('/delete/:id', protectRoute, deletePost);
router.put('/edit/:id', upload.single('file'), protectRoute, editPost);
router.get('/me', protectRoute, getMe);
router.get('/test', async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  console.log('test');
  res.json(posts);
});

module.exports = router;
