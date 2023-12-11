const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql'); // Make sure mysql is required if you are using it
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/' , express.static('public')); // Serve static files from the 'public' directory

// MySQL Database Connection (assuming you still need this for a part of your app)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
  connection.release();
});

// MongoDB Connection
const mongoDBUri = process.env.MONGO_URI || 'mongodb://localhost:27017/personal_budgeting_app';
mongoose.connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Failed to connect to MongoDB', error));

// Routes
const routes = require('./routes');
app.use('/', routes); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
