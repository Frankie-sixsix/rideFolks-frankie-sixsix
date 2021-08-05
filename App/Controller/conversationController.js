const Conversation = require('../models/Conversation');

const convController = {

    createConv: async (req, res) => {

        // Je reccupere l'id de l'utilisateur connecté ainsi que nom de la conversation (si la conversation en a un) ansi que l'id du particpant à la conversation
        const { id } = req.decoded;
        const { name, participant, idConv } = req.body;


        // console.log("id:", id, "name:", name);

        try {
            // J'initie une var vide qui contiendra l'id de la conversation qui va etre crée
            let idConvv;

            // Je verifie en bdd si la conversation existe deja
            const check = await Conversation.checkIfConvExist(idConv);

            // Si oui alors je ne la recrée pas de nouveau
            if (check) {
                return res.json('This conversation already exists');
            }
            // Si non alors je la crée et je stock l'id de creation de la conversation dans ma var idConvv
            if (!name) {
                idConvv = await Conversation.createConv(id, participant);
            }
            else {
                idConvv = await Conversation.createConv(id, participant, name);
            }

            // Je renvoie une reponse au front en lui disant que la conversation à bien été crée et je lui donne l'id de la conv
            const response = {
                text: 'Conversation crée',
                idConv: idConvv
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

//conversation 1