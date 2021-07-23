const User = require ('../models/User');
const bcrypt = require('bcrypt');

const userController = {

    addUser: async (req,res)=>{
    

        const user = new User(req.body);

        console.log("user:",user);
        console.log("mailo",user.mail);
        console.log("Password baby" , user.password);
        const mail = await User.verifyEmail(user.mail);
        // const cryptedPassword = bcrypt.hashSync(user.password,10);
        // console.log(cryptedPassword);
        if(mail === undefined){
            const cryptedPassword = bcrypt.hashSync(user.password,10);
            console.log(cryptedPassword);
            user.password = cryptedPassword;
            user.save();
            res.json("Inscription réussi");

        } else {
            res.json("L'email est deja utilisé");
        }
        console.log(mail);
       
    },

    verifyPass: async (req,res)=>{

        console.log(req.body.password);

        const cryptedPassword = bcrypt.hashSync(req.body.password,10);

        console.log('ok');
        const pass = await User.password(req.body.mail);
        console.log(pass.password);


        const isPasswordvalid = bcrypt.compareSync(req.body.password, pass.password);
        console.log(isPasswordvalid);
    },

    findAll: async (_,res)=>{

        const users = await User.findAll();
        res.json(users);
    },

    findOne: async (req,res)=>{

        const {id} = req.params;
        const user = await User.findOne(id);
            if(user === null){
                return res.json("Utilisateur introuvable");
            }
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