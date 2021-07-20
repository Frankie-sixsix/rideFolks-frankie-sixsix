const Network = require('../models/Network');

const networkController = {
    
    addFriend: async (req,res)=>{

        const {id,idFriend} = req.params;
        console.log("id", id, "idFriend", idFriend);
        await Network.addFriend(id,idFriend);
        res.json("ok");
    }

}

module.exports = networkController;