const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Route to handle login POST request
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  // Find user in MongoDB by name and password
  User.findOne({ name, password }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (!user) {
      // If user not found, render login page again with error message
      return res.status(401).sendFile(__dirname + '/login.html');
    }

    // If user found, redirect to home.html
    res.redirect('/home.html');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
