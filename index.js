require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');

const app = express();


const { Server } = require("socket.io");

app.use(cors());


app.use(express.json());

app.use(router);
app.use(express.static('./App/static/index.html'));


const server = app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

const io = new Server(server);

io.on('connection', (socket)=>{
    console.log('Connection..ok ');
    socket.on('message', (data)=>{
        io.emit('response', 'SAlut');
    })
})