require('dotenv').config();
const express = require('express');
const cors = require('cors');


app.use(cors());
const router = require('./App/router');

const io = require("socket.io");


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());


app.use(router);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});