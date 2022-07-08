const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from bearer in the header
      token = req.headers.authorization.split(' ')[1];
      //Verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Search for user  from token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = {
  protectRoute,
};
