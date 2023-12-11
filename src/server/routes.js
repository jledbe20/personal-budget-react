const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authenticateToken = require('./auth'); // Adjust the path as needed
const router = express.Router();
require('dotenv').config();

// ... other middleware ...

// Define routes
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.post('/signup', async (req, res) => {
    console.log("Signup route reached");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const date = transformDate(new Date());
        console.log("transformed date:", date)
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
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user == null) {
            return res.status(400).send('Cannot find user');
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
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


router.get('/protected', authenticateToken, (req, res) => {
    // This route is now protected with JWT
    res.send('Protected data');
});

const BudgetItem = require('./models/BudgetItem');

router.get('/budget', async (req, res) => {
    try {
        const data = await BudgetItem.find();
        res.json(data);
    } catch (err) {
        console.error('Budget Error:', err);
        res.status(500).json({ message: err.message });
    }
});

router.post('/budget', async (req, res) => {
    const newItem = new BudgetItem({
        custom_id:  req.body.custom_id,
        title:      req.body.title,
        value:      req.body.value,
        color:      req.body.color
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Transform date
function transformDate(dateObj) {
    let oldDate = dateObj;
    console.log("transforming date...");

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
router.use('*', (req, res) => {
    res.status(404).send('Endpoint not found');
  });

module.exports = router;