require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');
const app = express();

app.use(express.static('./App/static'));


app.use(cors());


app.use(express.json());

app.use(router);

const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});



// Reglage socket.io


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const Conversation = require('./App/models/Conversation');
const Message = require('./App/models/Message');

          


  // Nouveau socket.io


  io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('disconnect', () =>
       console.log(`Disconnected: ${socket.id}`));
    socket.on('join', (room) => {
       console.log(`Socket ${socket.id} joining ${room}`);
       socket.join(room);
    });
    socket.on('chat', async (data) => {


      console.log('DATA =', data);
      const idConv = await Conversation.test(data.idSender, data.idReceiver);
      const mess = new Message(data.message);
        if(!data.room){
          await mess.save(data.message, data.idSender, idConv);
        }
        else {
          await mess.save(data.message,data.idSender, data.room);
        }
              

       const { message, room } = data;
       console.log(`msg: ${message}, room: ${room}`);
       io.to(room).emit('chat', data);
    });
 });
