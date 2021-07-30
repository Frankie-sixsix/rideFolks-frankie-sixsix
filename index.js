require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');
const app = express();

// Require socket.io
const { Server } = require("socket.io");

// app.use(express.static('./App/static'));


app.use(cors());


app.use(express.json());

app.use(router);

const server = app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

const io = new Server(server);

io.on('connection', (socket)=>{
    socket.on('identity', name => socket.name = name);

    socket.on('message', phrase =>{
        io.emit('response', `${socket.name} à dit : ${phrase}`);
    })
});
