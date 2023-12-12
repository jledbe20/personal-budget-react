const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/', express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Correct the static files middleware to serve the build directory
app.use(express.static(path.join(__dirname, '../../build')));

// Routes
const routes = require('./routes');
app.use('/', routes);

// MongoDB Connection
const mongoDBUri = process.env.MONGO_URI || 'mongodb+srv://Fabio:Nolasco@cluster0.iim2erf.mongodb.net/';

mongoose.connect(mongoDBUri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('Failed to connect to MongoDB Atlas', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
