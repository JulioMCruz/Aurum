// import
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/newFiatAccount', (req, res) => {
    res.send('New Fiat Account');
    // TODO : Implement newFiatAccount
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});