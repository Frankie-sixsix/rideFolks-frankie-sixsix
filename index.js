require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const router = require('./App/router');
const cors = require('cors');

const io = require("socket.io");

const app = express();

// app.use(cors());

app.use(express.json());

app.use(router);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});