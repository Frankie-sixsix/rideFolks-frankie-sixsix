const Conversation = require('../models/Conversation');

const convController = {

    createConv: async (req,res)=>{

        const {id} = req.decoded;
        const {name} = req.body

        // console.log("id:", id, "name:", name);

        try {
            if(!name){
                await Conversation.createConv(id);
            }
            else {
                await Conversation.createConv(id,name);
            }
            res.json('Conversation crée');
        } catch (error){
            console.log(error);
        }
    },

    findAll: async(req,res)=>{

        const {id} = req.decoded;

        console.log("id in controller:", id);

        const conversations = await Conversation.findAll(id);

        // const date1 = conv[0];
        // console.log("date1a",date1);
      


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
