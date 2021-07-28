const Mode = require('../models/Mode');

const modeController = {

    addMode: async (req, res) => {

        const { id } = req.decoded;
        const { label } = req.body;

        // console.log("label", label);
        // console.log("id", id);

        const modeId = await Mode.getModeId(label);
        if (!modeId) {
            res.json("This mode does not exist");
        }
        else {
            const verifMode = Mode.verifMode(id, modeId);
            if (verifMode) {
                res.json('This mode is already in your profile');
            }
            else {
                await Mode.save(id, modeId);
                res.json('Added mode');
            }

        }

        // console.log("Mode = ", mode)
        if (!mode) {
            // console.log("nulll soryy");
            res.json("This mode does not exist");
        }
        else {
        }





    }

}

module.exports = modeController;