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
    }

}

module.exports = convController;
