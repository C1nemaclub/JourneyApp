const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/authhandler');
const {
  registerUser,
  loginUser,
  getMe,
  getRecentUsers,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getMe);
router.get('/recent', getRecentUsers);

module.exports = router;
