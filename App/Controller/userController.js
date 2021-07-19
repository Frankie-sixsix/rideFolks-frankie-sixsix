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

        const {id} = req.params;
        const user = await User.findOne(id);
        res.json(user);
    },

    // Methode pour supprimer un utilisateur 
    // ---- A modifier: Message de reponse quand un utilisateur a bien été supprimé
    deleteOne: async (req,res)=>{
        const {id} = req.params;
        const user = await User.findOne(id);
            if(user === null){
                res.json("Utilisateur introuvable");
            }
            else {
                await User.deleteOne(id);
                res.json("Utilisateur suppprimé");
            }

}
}

module.exports = userController;