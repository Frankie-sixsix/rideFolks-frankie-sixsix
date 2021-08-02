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
      

  //     if(message.id_conv){
  //       const existConv = await Conversation.checkIfConvExist(message.id_conv);

  //           if(!existConv){
  //               // ("This conversation does not exist");
                
  //               idConv = await Conversation.createConv(message.sender_id,message.participant,message.name);
  //               message.id_conv = idConv;
  //               // const mess = new Message(message);
        
  //               // await mess.save(message.sender_id,message.id_conv);
  //           }
  //           else {
  //             const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
  //             if(!verifIfUserIsInConv){
  //                 return ("You are not part of this conversation");
  //             }

  //           }

  //           const mess = new Message(message);
        
  //           await mess.save(message.sender_id,message.id_conv);
  //             // TEst pour rejoindre room
  //           // ws.join(message.id_conv);
     

  //     } else {

  //               idConv = await Conversation.createConv(message.sender_id,message.participant,message.name);
  //               const mess = new Message(message);
        
  //               await mess.save(message.sender_id,message.id_conv);
  //               return idConv;
  //           }
      
  //   io.emit('send_message_from_server', message);
  // });



    // Verifi si la conversation existe 
    const existConv = await Conversation.checkIfConvExist(message.id_conv);
      if(existConv){
          // On verifie si l'utilisateur a bien accée a cette conversation
          const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
          if(!verifIfUserIsInConv){
              return ("You are not part of this conversation");
          }
          // Si oui alors on enregistre le message dans la conv
        const mess = new Message(message);    
        await mess.save(message.sender_id,message.id_conv);

      }
           // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation
            
            idConv = await Conversation.createConv(message.sender_id,message.participant,message.name);
            message.id_conv = idConv;
            const mess = new Message(message);    
            await mess.save(message.sender_id,message.id_conv);
       
          const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
          if(!verifIfUserIsInConv){
              return ("You are not part of this conversation");
          }

        

        // const mess = new Message(message);
    
        // await mess.save(message.sender_id,message.id_conv);
          // TEst pour rejoindre room
        // ws.join(message.id_conv);
 

  
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
