const Place = require('../models/Place');

const placeController = {

    addPlace: async (req,res)=>{
    
        const {id} = req.params;
        // console.log(id);

        const place = new Place(req.body);
        // console.log(req.body);
        try {
            await place.save(id);
            res.json('Lieu ajouté'); 
        } catch (error){
            res.json(error.message);
        }

    },

}

module.exports = placeController;