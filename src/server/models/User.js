const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // email: { type: String, unique: true },
    date_created: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
