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

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// const io = new Server(server);

// let id = 0;
// io.on('connection', (ws) => {
//   console.log('>> socket.io - connected');
//   ws.on('send_message_from_client', (message) => {
//     console.log("J'ai recu le message : send_message_from_client", message);
//     // eslint-disable-next-line no-plusplus
//     message.id = ++id;
//     io.emit('send_message_from_server', message);
//   });
// });




// io.on('connection', (socket)=>{
//     socket.on('identity', name => socket.name = name);

//     socket.on('message', phrase =>{
//         io.emit('response', `${socket.name} à dit : ${phrase}`);
//     })
// });
