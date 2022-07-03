const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Verify if all data was inputed
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  //Check if User already Exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  //Save user to database
  user.save();

  //Check if user exists
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all the fields');
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // Generate new session token for the user
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};