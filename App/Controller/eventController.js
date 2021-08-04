const Event = require('../models/Event');

const eventController = {

    // Ajouter un evenement 
    addEvent: async (req,res)=>{
        const {id} = req.decoded;
        const event = new Event(req.body);

        try {
            await event.save(id);
            await Event.participate(id, event.id);
            
            res.json("OK");
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
                return res.json("Evenement introuvable");
            }
        res.json(event);
    },

    // Supprimer un evenement
    deleteOne: async (req,res)=>{
        const {id} = req.params;
        const event = await Event.findOne(id);
            if(event === null){
                res.json("Evenement introuvable");
            }
            else {
                await Event.deleteOne(id);
                res.json("Evenement suppprimé");
            }

    },

    // Participer à un evenement
    participate: async (req,res)=>{
        const {id,idEvent} = req.params;
        await Event.participate(id,idEvent);
        res.json("C'est ok");
    }

}

module.exports = eventController;