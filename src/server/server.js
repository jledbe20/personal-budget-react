const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql'); // Make sure mysql is required if you are using it
require('dotenv').config();
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

// const credentials = './X509-cert-8806832265127517724.pem';
// const client = new MongoClient('mongodb+srv://cluster0.iim2erf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//     tlsCertificateKeyFile: credentials,
//     serverApi: ServerApiVersion.v1
// });

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("testDB");
//         const collection = database.collection("testCol");
//         const docCount = await collection.countDocuments({});
//         console.log(docCount);
//         // perform actions using client
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/', express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
const JWT_TIMEOUT = process.env.JWT_TIMEOUT || '3m'; // default to 3 minutes

// Correct the static files middleware to serve the build directory
app.use(express.static(path.join(__dirname, '../../build' + '/index.html')));


// Routes
const routes = require('./routes');
app.use('/', routes);


// MySQL Database Connection 
// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// db.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log('Connected to the MySQL server.');
//     connection.release();
// });

// MongoDB Connection
// const mongoDBUri = process.env.MONGO_URI || 'mongodb://localhost:27017/personal_budgeting_app';
const mongoDBUri = process.env.MONGO_URI || 'mongodb+srv://Fabio:Nolasco@cluster0.iim2erf.mongodb.net/'

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
