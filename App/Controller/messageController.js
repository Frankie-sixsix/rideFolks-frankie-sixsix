const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { verifDiscipline } = require('../models/Discipline');

const messageController = {

    createMessage: async (req,res)=>{

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
        
        
        const message = new Message(req.body);
        

        // console.log(message);

        try {
            await message.save(id,idConv);
            res.json("Message sent");
        } catch (error){
            console.log(error);
        }


    }

}

module.exports = messageController;
