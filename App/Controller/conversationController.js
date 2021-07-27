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

        // console.log("id in controller:", id);

        const conversations = await Conversation.findAll(id);

        // const date1 = conv[0];
        // console.log("date1a",date1);
      


        res.json(conversations);

    },

    
}

module.exports = convController;
