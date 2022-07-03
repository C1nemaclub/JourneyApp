if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const { errorHandler } = require('./middleware/errorHandler');
const multer = require('multer');

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

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('Connected to Mongoose'));

/*
app.get('/', (req, res) => {
  res.send('Home');
});
*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
