const Mode = require('../models/Mode');

const modeController = {

    addMode: async (req, res) => {

        const { id } = req.decoded;
        const { label } = req.body;

        console.log("label on post=", label);
        // console.log("id", id);

        const modeId = await Mode.getModeId(label);
        // console.log('modeId"', modeId);
        if (!modeId) {
            res.json("This mode does not exist");
        }
        else {
            const verifMode = await Mode.verifMode(id, modeId);
            // console.log(verifMode,"hh");
            if (!verifMode) {
                await Mode.save(id, modeId);
                res.json('Added mode');
            }
            else {
                res.json('This mode is already in your profile');
            }

        }

    },

    deleteMode: async (req, res) => {

        const { id } = req.decoded;
        const { label } = req.body;

        const modeId = await Mode.getModeId(label);

        if (!modeId) {
            res.json("This mode does not exist");
        }
        else {

            const verifMode = await Mode.verifMode(id, modeId);
            console.log(verifMode, "verifMode");
            if (verifMode) {
                await Mode.deleteMode(id, modeId);
                res.json('Mode deleted from your profile');
            }
            else {
                res.json('This mode is not part of your profile');
            }
        }
    },


}

module.exports = modeController;