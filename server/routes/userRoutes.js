const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/authhandler');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getMe);
module.exports = router;
