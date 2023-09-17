const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Load environment variables from .env file using 'dotenv'
require('dotenv').config();

// Connect to the MongoDB database
// connecting the database
let mongodb_url = 'mongodb+srv://adhogalgallo:uXxUdeqrE7LWgwFD@cluster0.wge4lfn.mongodb.net/?retryWrites=true&w=majority';
let dbName = 'darkroom';
mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    if (err) console.log(err)
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected successfully');
});

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/', index);
app.use('/image', image);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
