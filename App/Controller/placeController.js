const Place = require('../models/Place');

const placeController = {

    addPlace: async (req, res) => {

        const { id } = req.decoded;
        const { address } = req.body;

        // Mettre en place un control si un lieu est deja ajouté (verif..)

        const place = new Place(req.body);

        try {
            await place.save(id);
            res.json('Lieu ajouté');
        } catch (error) {
            res.json(error.message);
        }

    },

    deletePlace: async (req, res) => {

        const { idPlace } = req.params;
        const { id } = req.decoded;
        const place = await Place.findOne(idPlace);
        if (place === null) {
            res.json("Lieu introuvable");
        }
        else {
            await Place.deleteOne(idPlace);
            res.json("Lieu suppprimé");
        }
    }

}

module.exports = placeController;