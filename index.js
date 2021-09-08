require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const router = require('./App/router');
const app = express();

// Require socket.io
// const { Server } = require("socket.io");

app.use(express.static('./App/static'));


app.use(cors());


app.use(express.json());

app.use(router);

const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});



// Reglage socket.io


// const io = new Server(server);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const Conversation = require('./App/models/Conversation');
const Message = require('./App/models/Message');



// let connectedUser = {};
// let idConv;

// io.on('connection', async(ws) => {
//   // console.log('>> socket.io - connected');
//   // console.log('>> ws', ws);

//   ws.on('register', function(userId){
//     ws.userId = userId;
//     connectedUser[userId] = ws;
//     // console.log('/_/_/connecteduser:',connectedUser);
//   });

//   ws.on('create', function(room){
//     ws.join(room);
//     console.log('//ROOM:', room);
//   });




  // ws.on('send_message_from_client', async(message) => {
  //   console.log("J'ai recu le message : send_message_from_client", message);
      

    
    
  //   try {

      // je recoit la id_conv dans message.id_conv
    //-- Puis je verifie si la conv existe (si elle existe je recupere son id)
    
      // Si oui je verifie si l'utilisateur fait partie de la conversation 
          // si oui alors je save le message en base de données dans la conversation message.id_conv
    //-- Si la conv n'existe pas alors je crée une conversation, je reccupere son id et je sauvegarde le message dans cette id_conv



      
      // Verifie si la conversation existe 
      // const existConv = await Conversation.checkIfConvExist(message.id_conv);
      // if(existConv){
      //   // On verifie si l'utilisateur a bien accée a cette conversation
      //   const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
      //         if(!verifIfUserIsInConv){
      //           return ("You are not part of this conversation");
      //         }

      //         // Si oui alors on enregistre le message dans la conv
      //         const mess = new Message(message);    
      //         await mess.save(message.sender_id,message.id_conv);
              
              
              
      //       } else {
      //         // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation
              
      //         idConv = await Conversation.createConv(message.sender_id,message.participant,message.name);
              
      //         // const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
      //         // if(!verifIfUserIsInConv){
      //           //     return ("You are not part of this conversation");
      //           // }
      //           console.log("IdConv", idConv);
      //           // message.id_conv = idConv;
      //           const mess = new Message(message);    
      //           await mess.save(message.sender_id,message.id_conv);
                
      //         }
              


      //         // console.log('Array//', Array.from(io.sockets.adapter.rooms));
      //         io.emit('send_message_from_API', message );
              
              
              
      //       } catch (error) {
      //         console.log(error);
      //       }
            
              
      //       });
      //     });
          
          


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
      const idConv = await Conversation.createConv(data.idSender, data.idReceiver);
      const mess = new Message(data.message);
        if(!data.room){
          await mess.save(data.message, data.idSender, idConv);
        }
        else {
          await mess.save(data.message,data.idSender, data.room);
        }
          //Verifie si la conversation existe 
      // const existConv = await Conversation.checkIfConvExist(data.room);
      // if(!existConv){
      //   // On verifie si l'utilisateur a bien accée a cette conversation
      //   const verifIfUserIsInConv = await Conversation.verifConv(data.idSender,data.room);
      //         if(!verifIfUserIsInConv){
      //           return ("You are not part of this conversation");
      //         }

      //         // Si oui alors on enregistre le message dans la conv
      //         const mess = new Message(data.message);    
      //         await mess.save(data.idSender,data.room);
              
              
              
      //       } else {
      //         // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation
              
      //         idConv = await Conversation.createConv(data.idSender,data.idReceiver);
              
      //         // const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
      //         // if(!verifIfUserIsInConv){
      //           //     return ("You are not part of this conversation");
      //           // }
      //           console.log("IdConv", idConv);
      //           // message.id_conv = idConv;
      //           const mess = new Message(data.message);    
      //           await mess.save(data.idSender,idConv);
                
      //         }
              

       const { message, room } = data;
       console.log(`msg: ${message}, room: ${room}`);
       io.to(room).emit('chat', message);
    });
 });







  // je recoit la id_conv dans message.id_conv
    //-- Puis je verifie si la conv existe (si elle existe je recupere son id)

      // Si oui je verifie si l'utilisateur fait partie de la conversation 
          // si oui alors je save le message en base de données dans la conversation message.id_conv
    //-- Si la conv n'existe pas alors je crée une conversation, je reccupere son id et je sauvegarde le message dans cette id_conv




// Previous version socket.io
// // Reglage socket.io


// const io = new Server(server);

// const Conversation = require('./App/models/Conversation');
// const Message = require('./App/models/Message');




// let roomZ;

// io.on('connection', async (ws) => {
//   console.log('>> socket.io - connected');

//   ws.on('create', function (room) {
//     ws.join(room.toString());
//     // io.in(room.toString()).emit('userJoin', 'yu');

// //   ws.on('create', function (room, callback) {
// //     ws.join(room.toString());
// //     callback('userJoin' + room);
// // });

    
//     // const roster = io.sockets.adapter.rooms.get(room);

//   });


//   ws.on('send_message_from_client', async (message) => {
//     console.log("J'ai recu le message : send_message_from_client", message);

//     try {

//       // Verifie si la conversation existe 
//       const existConv = await Conversation.checkIfConvExist(message.id_conv);
//       if (existConv) {
//         // On verifie si l'utilisateur a bien accée a cette conversation
//         const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id, message.id_conv);
//         if (!verifIfUserIsInConv) {
//           return ("You are not part of this conversation");
//         }
//         // Si oui alors on enregistre le message dans la conv
//         const mess = new Message(message);
//         await mess.save(message.sender_id, message.id_conv);

//       } else {
//         // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation

//         idConv = await Conversation.createConv(message.sender_id, message.participant, message.name);
//         message.id_conv = idConv;
//         const mess = new Message(message);
//         await mess.save(message.sender_id, message.id_conv);
//       }

//       roomZ = message.id_conv;

//       // io.to(roomZ.toString()).emit('send_message_from_API', message);

//       io.emit('send_message_from_API', message);

//       // io.in(message.id_conv).emit('send_message_from_API', message);
    
      
//       // io.sockets.in(roomZ.toString()).emit('send_message_from_API', message);
      
//       console.log('RoomZ=', roomZ);
      
//       console.log('Message = ', message);




//     } catch (error) {
//       console.log(error);
//     }

//     // const mess = new Message(message);

//     // await mess.save(message.sender_id,message.id_conv);
//     // TEst pour rejoindre room
//     // ws.join(message.id_conv);


//     // ws.on('room', room =>{
//     //   console.log('R00m:', room);
//     //   io.to(room).emit('send_message_from_server', message)
//     // });



//   });
// });







// //Verifie si la conversation existe 
// const existConv = await Conversation.checkIfConvExist(data.room);
// if(!existConv){
//   // On verifie si l'utilisateur a bien accée a cette conversation
//   const verifIfUserIsInConv = await Conversation.verifConv(data.idSender,data.room);
//         if(!verifIfUserIsInConv){
//           return ("You are not part of this conversation");
//         }

//         // Si oui alors on enregistre le message dans la conv
//         const mess = new Message(data.message);    
//         await mess.save(data.idSender,data.room);
        
        
        
//       } else {
//         // Si non alors on crée une conversation PUIS on enregistre le message dans cette conversation
        
//         idConv = await Conversation.createConv(data.idSender,data.idReceiver);
        
//         // const verifIfUserIsInConv = await Conversation.verifConv(message.sender_id,message.id_conv);
//         // if(!verifIfUserIsInConv){
//           //     return ("You are not part of this conversation");
//           // }
//           console.log("IdConv", idConv);
//           // message.id_conv = idConv;
//           const mess = new Message(data.message);    
//           await mess.save(data.idSender,idConv);
          
//         }