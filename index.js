require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');
const app = express();

// Require socket.io
const { Server } = require("socket.io");

app.use(express.static('./App/static'));


app.use(cors());


app.use(express.json());

app.use(router);

const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});




// Reglage socket.io


const io = new Server(server);

const Conversation = require('./App/models/Conversation');
const Message = require('./App/models/Message');




let roomZ;

io.on('connection', async (ws) => {
  console.log('>> socket.io - connected');

  ws.on('create', function (room) {
    ws.join(room.toString());
    io.to(roomZ.toString()).emit('userJoin', 'yu');
    
    // const roster = io.sockets.adapter.rooms.get(room);

  });


  ws.on('send_message_from_client', async (message) => {
    console.log("J'ai recu le message : send_message_from_client", message);

    try {

      // Verifie si la conversation existe 
      const existConv = await Conversation.checkIfConvExist(message.id_conv);
      if (existConv) {
        // On verifie si l'utilisateur a bien accée a cette conversation
        const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id, message.id_conv);
        if (!verifIfUserIsInConv) {
          return ("You are not part of this conversation");
        }
        // Si oui alors on enregistre le message dans la conv
        const mess = new Message(message);
        await mess.save(message.sender_id, message.id_conv);

      } else {
        // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation

        idConv = await Conversation.createConv(message.sender_id, message.participant, message.name);
        message.id_conv = idConv;
        const mess = new Message(message);
        await mess.save(message.sender_id, message.id_conv);
      }

      roomZ = message.id_conv;

      io.to(roomZ.toString()).emit('send_message_from_API', message);
    
      
      // io.sockets.in(roomZ.toString()).emit('send_message_from_API', message);
      
      console.log('RoomZ=', roomZ);
      
      console.log('Message = ', message);




    } catch (error) {
      console.log(error);
    }

    // const mess = new Message(message);

    // await mess.save(message.sender_id,message.id_conv);
    // TEst pour rejoindre room
    // ws.join(message.id_conv);


    // ws.on('room', room =>{
    //   console.log('R00m:', room);
    //   io.to(room).emit('send_message_from_server', message)
    // });



  });
});

