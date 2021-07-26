const Network = require('../models/Network');

const networkController = {
    
    addFriend: async (req,res)=>{

        const {idFriend} = req.params;
        const {id} = req.decoded;
        // console.log("id55",id);
        // Je verifie si les deux utilisateur sont amies garce à la methode 
        const friend = await Network.verifyfriendship(id,idFriend);
        // Si friend n'est pas "null" ca veut dire que les deux utilisateurs sont amies
        if(friend){
            // Si ils sont deja amies j'avertie le front qu'ils ont deja amies
            res.json('Vous etes deja ami avec cette utilisateur');
        } else {
            // Si il ne le son pas alors je peu l'ajouter à sa liste d'amie
            await Network.addFriend(id,idFriend);
            res.json("Ami ajouté");
        }
    },

    deleteFriend: async (req,res)=>{

        const {idFriend} = req.params;
        const {id} = req.decoded;
        // Je verifie si les deux utilisateur sont amies garce à la methode 
        const friend = await Network.verifyfriendship(id,idFriend);
        // Si friend n'est pas "null" ca veut dire que les deux utilisateurs sont amies
        if(friend){
            // Donc je peux supprimer l'idFriend de la liste de l'utilisateur(id)
            await Network.deleteFriend(id,idFriend);
            res.json("Ami supprimé");
        } else {
            // Si ils ne sont pas amies alors je ne peux pas le supprimer de sa liste (car il n'y es pas) 
            res.json("Cette utilisateur n'est pas dans votre liste d'ami");
        }
        
    },

    showFriendList: async (req,res)=>{
        
        const {id} = req.decoded;
        const friend = await Network.showFriendList(id);
        res.json(friend);
    }

}

module.exports = networkController;