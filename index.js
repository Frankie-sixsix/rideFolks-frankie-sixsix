require('dotenv').config();
const express = require('express');
const router = require('./App/router');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
 //A enlever apres test pour un url encoded

app.use(router);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});