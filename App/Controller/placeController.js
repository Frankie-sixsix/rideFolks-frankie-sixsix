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

    // Voir notes persos pour problematique :
    // - Pour rechercher un lieu deja existant et l'ajouter au profil? 
    // - Si un utilisateur supprime un lieu est ce que le lieu doit etre supprimé de la table "place" ou suelmeent le lien dans la table "user_has_place"
    
    deletePlace: async (req,res)=>{

        const {idPlace} = req.params;
        const place = await Place.findOne(idPlace);
            if(place === null){
                res.json("Lieu introuvable");
            }
            else {
                await Place.deleteOne(idPlace);
                res.json("Lieu suppprimé");
            }
    }

}

module.exports = placeController;