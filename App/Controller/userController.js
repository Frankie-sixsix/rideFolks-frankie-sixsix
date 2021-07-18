const User = require ('../models/User');

const userController = {

    addUser: async (req,res)=>{
    
        const user = new User(req.body);
        console.log(req.body);
        try {
            await user.save();
            res.json(user);
        } catch (error){
            res.json(error.message);
        }
    },

    findAll: async (_,res)=>{

        const users = await User.findAll();
        console.log(users);
        res.json(users);
    },

    findOne: async (req,res)=>{

        const id = req.params.id;
        const user = await User.findOne(id);
        res.json(user);
    }
}

module.exports = userController;