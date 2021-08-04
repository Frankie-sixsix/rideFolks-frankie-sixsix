const Conversation = require('../models/Conversation');

const convController = {

    createConv: async (req,res)=>{

        const {id} = req.decoded;
        const {name, participant, idConv} = req.body;
        

        // console.log("id:", id, "name:", name);

        try {
            let idConvv;

            const check = await Conversation.checkIfConvExist(idConv);
                if(check){
                    return res.json('This conversation already exists');
                }
            if(!name){
                idConvv = await Conversation.createConv(id,participant);
            }
            else {
                idConvv = await Conversation.createConv(id,participant,name);
            }
            console.log(idConvv,"idConv");
                const response = {
                    text: 'Conversation crée',
                    idConv: idConvv
                }
            res.json(response);
        } catch (error){
            console.log(error);
        }
    },

    findAll: async(req,res)=>{

        const {id} = req.decoded;

        console.log("id in controller:", id);
        // const infos = await Conversation.infoOnDiscussion(68);
        // console.log(infos);

        const inf = [];

        const conversations = await Conversation.findAll(id);
        // const infos = await Conversation.infoOnConversation(1, id);
        //     console.log('inff',infos);

             for(const conversation of conversations){
                 const infos = await Conversation.infoOnConversation(conversation.id, id);
                 conversation.receiver = infos;
                // console.log('conversation', conversation);


            // }
                // inf.push(infos);                
                //  console.log('infos', infos);
                //  console.log('conversation: ', conversation.id);


            //  for(const i of conversations){
            //      console.log('ccccc',i.receiver)

            //  }

            // console.log(id, 'inf');



            // for(const conversation of conversations){
            //     console.log(conversation);
            //     const infos = await Conversation.infoOnDiscussion(conversation.id);
            //     conversation.infos = infos;
            // }
        // console.log("conv",conversationss);

        // const date1 = conv[0];
        // console.log("date1a",date1);
             }
      


        res.json(conversations);

    },

    quitConv: async(req,res)=>{

        const {id} = req.decoded;
        const convId = req.params.id;

        // console.log(id, convId);

        const verified = await Conversation.verifConv(id,convId);

        if(verified){
            await Conversation.quitConv(id,convId);
    
            res.json("Vous avez quitté la conversation");
        } 
        else {
            res.json('Vous ne faites pas partie de cette conversation');
        }



    },

    participateConv: async(req,res)=>{
        
        const {id} = req.decoded;
        const convId = req.params.id;

        const verified = await Conversation.verifConv(id,convId);

        if(!verified){
            await Conversation.participate(id,convId);
    
            res.json("Vous avez rejoint la conversation");
        } 
        else {
            res.json('Vous faites deja partie de la conversation');
        }
        
    
    },

    getMessagesFromConv: async (req,res)=>{

        const {id} = req.decoded;
        const {idConv} = req.params;

        const existConv = await Conversation.checkIfConvExist(idConv);
            if(!existConv){
                return res.json("This conversation does not exist")
            }
        
        const verifIfUserIsInConv = await Conversation.verifConv(id,idConv);
            if(!verifIfUserIsInConv){
                return res.json("You are not part of this conversation");
            }
        

        const conv = await Conversation.getMessagesFromConversation(idConv);
        // console.log(conv);
        res.json(conv);

    }

    
}

module.exports = convController;
