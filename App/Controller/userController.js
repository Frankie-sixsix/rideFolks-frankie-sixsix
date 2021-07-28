require('dotenv').config();
const User = require('../models/User');
const Network = require('../models/Network');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userController = {

    addUser: async (req, res) => {


        const user = new User(req.body);

        // console.log("user:",user);
        // console.log("mailo",user.mail);
        // console.log("Password baby" , user.password);
        const email = await User.verifyEmail(user.email);

        if (email === undefined) {
            const cryptedPassword = bcrypt.hashSync(user.password, 10);
            // console.log(cryptedPassword);
            user.password = cryptedPassword;
            user.save();
            res.json("Inscription réussi");

        } else {
            res.json("L'email est deja utilisé");
        }


    },

    
    authentifiacation: async (req, res) => {

        // console.log(req.body.password);
        // console.log(req.body.email);
        const SECRET_KEY = process.env.SECRET_KEY;
        

        const verifyEmail = await User.verifyEmail(req.body.email);
        // console.log("verifyEmail", verifyEmail);

            if(verifyEmail){
            const pass = await User.getPassword(req.body.email);
            // console.log("pass",pass);

            if (pass) {
                // console.log(pass.password, "oo");
                const isPasswordvalid = bcrypt.compareSync(req.body.password, pass.password);
                // console.log(isPasswordvalid);

                if (!isPasswordvalid) {
                    return res.json("Mot de passe incorect");
                } else {

                    // res.json("Connection..ok !");
                    const expireIn = 24 * 60 * 60;
                    let token    = jwt.sign({
                        last_name: pass.last_name,
                        first_name: pass.first_name,
                        id: pass.id
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });

                    console.log("token",token);

                    res.header('Authorization', 'Bearer' + token);

                    return res.status(200).json(token);
                    // TODO : Faire le jwt ici
                }
            }
        }
        else {
            res.json('Email incorrect');
        }


    },

    findAll: async (_, res) => {

        const users = await User.findAll();
        res.json(users);
    },

    findOne: async (req, res) => {

        const { id } = req.params;
        const user = await User.findOne(id);
        if (user === null) {
            return res.json("Utilisateur introuvable");
        }

        res.json(user);
    },

    // Methode pour supprimer un utilisateur 
    // ---- A modifier: Message de reponse quand un utilisateur a bien été supprimé
    deleteOne: async (req, res) => {
        const { id } = req.params;
        const user = await User.findOne(id);
        if (user === null) {
            res.json("Utilisateur introuvable");
        }
        else {
            await User.deleteOne(id);
            res.json("Utilisateur suppprimé");
        }

    },

    getMessages: async (req,res)=>{

        const {id} = req.params
        // TODO : faire une class message pour presener les messages un par un comme UserFront
    },

    getProfile: async (req,res)=>{

        const {id} = req.decoded;
        // console.log(id,"idd");
        const user = await User.findOne(id);
        const friend = await Network.showFriendList(id);
        const events = await User.showEventsList(id);
        console.log(events);
        user.friend = friend;
        user.event = events;
        // user.mode = mode 
        // console.log(user);
        // user.friend = 'ok';
        // console.log("userFriend",user.friend);
        // TODO : afficher ses modes et ses disciplines dans user
        res.json(user);

    },

    updateUser: async(req,res)=>{

        const user = new User(req.body);
        const {id} = req.decoded;
        // console.log("yey", id);

        try {
            await user.update(id);
            res.json('Utilisateur modifié');

        } catch (error){
            console.log(error);
        }

    }
}

module.exports = userController;