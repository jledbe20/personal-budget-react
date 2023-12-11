const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    color: {
        type: String,
        required: true,
        match: /^#[0-9a-fA-F]{6}$/  // matches hexadecimal colors
    }
});

module.exports = mongoose.model('Budget', budgetSchema);
