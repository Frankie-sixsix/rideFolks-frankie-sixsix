const Event = require('../models/Event');

const eventController = {

    // Ajouter un evenement 
    addEvent: async (req,res)=>{
        const event = new Event(req.body);
        console.log(req.body);
        try {
            await event.save();
            res.json("Evenement crée");
        } catch (error){
            res.json(error.message);
        }
    },

    // Voir touts les evenements
    findAll: async (req,res)=>{
        const events = await Event.findAll();
        console.log(events);
        res.json(events);
    },

    // Voir un evenement 
    findOne: async (req,res)=>{
        const {id} = req.params;
        const event = await Event.findOne(id);
            if(event === null){
                return res.json("Utilisateur introuvable");
            }
        res.json(event);
    }

}

module.exports = eventController;