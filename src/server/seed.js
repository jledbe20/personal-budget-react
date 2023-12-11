const mongoose = require('mongoose');
const BudgetItem = require('./models/BudgetItem'); // Adjust the path as needed
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(error => console.error('Failed to connect to MongoDB', error));

// Sample data to insert
const budgetItems = [
    { custom_id: 1, title: 'GROCERIES', value: 300, color: '#ffcd56' },
    { custom_id: 2, title: 'RENT', value: 800, color: '#ff6384' },
    { custom_id: 3, title: 'UTILITIES', value: 200, color: '#36a2eb' },
    { custom_id: 4, title: 'TRANSPORTATION', value: 150, color: '#4bc0c0' },
    { custom_id: 5, title: 'ENTERTAINMENT', value: 100, color: '#9966ff' },
    { custom_id: 6, title: 'INSURANCE', value: 250, color: '#c9cbcf' },
    { custom_id: 7, title: 'DINING OUT', value: 180, color: '#ff9f40' },
    { custom_id: 8, title: 'CLOTHING', value: 100, color: '#f44336' },
    { custom_id: 9, title: 'SAVINGS', value: 500, color: '#4caf50' },
    { custom_id: 10, title: 'MISCELLANEOUS', value: 150, color: '#607d8b' }
];


// Function to seed data
async function seedDB() {
    try {
        // Optional: Clear existing data
        await BudgetItem.deleteMany({});

        // Insert new data
        await BudgetItem.insertMany(budgetItems);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

seedDB();