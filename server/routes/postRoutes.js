const express = require('express');
const multer = require('multer');

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

module.exports = router;
