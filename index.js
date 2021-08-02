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



io.on('connection', async(ws) => {
  console.log('>> socket.io - connected');
  ws.on('send_message_from_client', async(message) => {
    console.log("J'ai recu le message : send_message_from_client", message);
      

      if(message.idConv){
        const existConv = await Conversation.checkIfConvExist(idConv);

            if(!existConv){
                return ("This conversation does not exist")
            }

            const verifIfUserIsInConv = await Conversation.verifConv(id,idConv);


            if(!verifIfUserIsInConv){
                return ("You are not part of this conversation");
            }
        
            const mess = new Message(message);
        
            await mess.save(message.sender_id,message.idConv);

            return 'Ok';

      } else {

        let idConv;
            if(!name){
                idConv = await Conversation.createConv(id,idParticipant);
            }
            else {
                idConv = await Conversation.createConv(id,idParticipant,name);
            }

          return idConv;
      }
    // eslint-disable-next-line no-plusplus
    // message.id = ++id;
    io.emit('send_message_from_server', message);
  });
});


// Structure du message pour renregistrer message

  // Imprtle model Conversation
  // Importe le 

// message.sender_id 
// message.content 
// message.receiver_id (id de la room)





// io.on('connection', (socket)=>{
//     socket.on('identity', name => socket.name = name);

//     socket.on('message', phrase =>{
//         io.emit('response', `${socket.name} à dit : ${phrase}`);
//     })
// });
