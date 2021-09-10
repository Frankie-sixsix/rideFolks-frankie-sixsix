const Conversation = require('../models/Conversation');

const convController = {

    test: async (req,res)=>{
        const idCheck = await Conversation.checkIdConversation(25,37);
            if(idCheck){
                console.log('Ca existe deja')
                console.log('id =', idCheck);
            } else {
                console.log('Ca existe pas');
            }

    },
    createConv: async (req, res) => {

        // Je reccupere l'id de l'utilisateur connecté ainsi que nom de la conversation (si la conversation en a un) ansi que l'id du particpant à la conversation

        const { id } = req.decoded;
        const { name, participant, idConv } = req.body;
      


        
        
        try {
            // J'initie une var vide qui contiendra l'id de la conversation qui va etre crée, ou celle qui existe deja 
            let idConvv;
            let response;

            //Je verifie si l'user A et l'user B ont deja parlé
            const idConversationCheck = await Conversation.checkIdConversation(id,participant);

                // Si oui alors je reccupere l'id de leurs conversations que je stock dans ma variable idConv ou je vais enregistrer les messages
                    if(idConversationCheck){
                        idConvv = idConversationCheck;
                        response = {
                        text: 'Conversation déja existante',
                        idConv: idConvv
                    }
                    }
                    else {
                        idConvv = await Conversation.createConv(id, participant, name);
                        response = {
                            text: 'Conversation crée',
                            idConv: idConvv
                        }
                    }
                
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },

    findAll: async (req, res) => {

        // Je reccupere l'id de l'utilisateur connécté
        const { id } = req.decoded;

        // Je reccupere la date , le nom et l'id de chaque conversation auquel l'utilisateur participe
        const conversations = await Conversation.findAll(id);

        // Puis je boucle 
        for (const conversation of conversations) {
            // Je reccupere la personne avec qui discute l'user, dans les conversation 
            // Je recupere son id, son nom , prenom ainsi que sa photo de profil
            const infos = await Conversation.infoOnConversation(conversation.id, id);
            // je stock les infos du participant dans une variable que je nomme receiver (pour le front)
            conversation.receiver = infos;
        }
        // Je renvoie tout ca au front
        res.json(conversations);

    },

    quitConv: async (req, res) => {

        // Je reccupere l'id de l'utilisateur connecté + l'id de la conversation
        const { id } = req.decoded;
        const idConv = req.params.id;

        // Je verifie si la conversation existe 
        const verified = await Conversation.verifConv(id, idConv);

        // Si oui alors je fait quitter l'utilisateur de la conversation
        if (verified) {
            await Conversation.quitConv(id, idConv);

            res.json("Vous avez quitté la conversation");
        }
        else {
            res.json('Vous ne faites pas partie de cette conversation');
        }



    },

    participateConv: async (req, res) => {

        const { id } = req.decoded;
        const idConv = req.params.id;

        const verified = await Conversation.verifConv(id, idConv);

        if (!verified) {
            await Conversation.participate(id, idConv);

            res.json("Vous avez rejoint la conversation");
        }
        else {
            res.json('Vous faites deja partie de la conversation');
        }


    },

    getMessagesFromConv: async (req, res) => {

        const { id } = req.decoded;
        const { idConv } = req.params;

        const existConv = await Conversation.checkIfConvExist(idConv);
        if (!existConv) {
            return res.json("This conversation does not exist")
        }

        const verifIfUserIsInConv = await Conversation.verifConv(id, idConv);
        if (!verifIfUserIsInConv) {
            return res.json("You are not part of this conversation");
        }


        const conv = await Conversation.getMessagesFromConversation(idConv);

        res.json(conv);

    }


}

module.exports = convController;

