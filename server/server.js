require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const { errorHandler } = require('./middleware/errorHandler');
const multer = require('multer');
const User = require('./models/usersModel');

const port = process.env.PORT || 6000;

const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
app.use(errorHandler);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')));
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production');
  });
}

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.get('*', (req, res) => {
//     return res.sendFile(
//       path.resolve(__dirname, '../', 'client', 'build', 'index.html')
//     );
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Please set to production');
//   });
// }

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Connected to Mongoose'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
