// Budget API

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require("path");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/' , express.static('public'));

const budget_file = require("./budget.json");
const budget_file2 = require("./budget2.json");
var budget = budget_file;
var budget2 = budget_file2;
console.log(budget_file);

app.get('/budget', (req, res) => {
    budget = budget_file;
    res.json(budget);
});

app.get("/new_chart", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/new_chart.html"));
});

app.get('/new_budget', (req, res) => {
    budget2 = budget_file2;
    res.json(budget2);
});

app.get('/hello', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}...`);
});