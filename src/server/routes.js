const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authenticateToken = require('./auth'); // Adjust the path as needed
const router = express.Router();
require('dotenv').config();

const path = require('path');
// const app = express();

// Correct the static files middleware to serve the build directory
router.use(express.static(path.join(__dirname, '../../build')));

// Define routes
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.post('/signup', async (req, res) => {
    console.log("Signup route reached.");
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const date = transformDate(new Date());
        console.log("Transformed date:", date)
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(201).json({ userId: savedUser._id });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: error.message });
    }
});


router.post('/login', async (req, res) => {
    console.log("Login route reached.");
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }

        if (await bcryptjs.compare(req.body.password, user.password)) {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        } else {
            res.status(403).send('Login not allowed');
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/logout', (req, res) => {
    console.log("Logout route reached.");
    // For JWT, there isn't much to do here since the token is stored client-side.
    // If using sessions, you would destroy the session here.
    // If using a blacklist, you would add the token to the blacklist here.

    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
    history.push('/login');
    res.status(200).send('Logged out successfully');
});


router.get('/protected', authenticateToken, (req, res) => {
    // This route is now protected with JWT
    res.send('Protected data');
});

const routes = require('./routes');
// router.use('/', routes); 


const BudgetItem = require('./models/BudgetItem');

router.get('/budget', async (req, res) => {
    console.log("Budget GET route reached.");
    try {
        const data = await BudgetItem.find();
        res.json(data);
    } catch (err) {
        console.error('Budget Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Assuming 'router' is your express router and 'BudgetItem' is your mongoose model


router.post('/budget', async (req, res) => {
    console.log("Budget POST route reached.");
    console.log(req.body); // Log the request body to see what is being sent
    const newItem = new BudgetItem({
        custom_id: req.body.custom_id,
        title: req.body.title,
        value: req.body.value,
        color: req.body.color
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error adding item:', err); // Log the detailed error
        res.status(400).json({ message: err.message });
    }
});


// Transform date
function transformDate(dateObj) {
    let oldDate = dateObj;
    console.log("Transforming date...");

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log("old date:", oldDate, "\nnew date:", date)
    return date;
}

// After all other route definitions
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
  
router.use('*', (req, res) => {
    res.status(404).send('Endpoint not found');
});


module.exports = router;