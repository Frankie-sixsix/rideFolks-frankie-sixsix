require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');

const io = require("socket.io");

const app = express();

app.use(cors());

app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); next(); });

app.use(express.json());

app.use(router);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});