const mongoose = require('mongoose');
const BudgetItem = require('./server/models/BudgetItem'); // Adjust the path as needed
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
    // Add more items as needed
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