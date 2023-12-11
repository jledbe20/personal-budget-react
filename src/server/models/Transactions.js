const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    budget: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
