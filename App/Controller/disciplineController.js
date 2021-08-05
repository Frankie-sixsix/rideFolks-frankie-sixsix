const Discipline = require('../models/Discipline');

const disciplineController = {

    addDiscipline: async (req, res) => {

        const { id } = req.decoded;
        const { name } = req.body;

        const disciplineId = await Discipline.getDisciplineId(name);
        if (!disciplineId) {
            res.json("This discipline does not exist");
        }
        else {
            const verifDiscipline = await Discipline.verifDiscipline(id, disciplineId);
            if (!verifDiscipline) {
                await Discipline.save(id, disciplineId);
                res.json('Added disicpline');
            }
            else {
                res.json('This discipline is already in your profile');
            }

        }

    },

    deleteDiscipline: async (req, res) => {

        const { id } = req.decoded;
        const { name } = req.body;

        const disciplineId = await Discipline.getDisciplineId(name);
        const verifDiscipline = await Discipline.verifDiscipline(id, disciplineId);
        if (verifDiscipline) {
            await Discipline.deleteDiscipline(id, disciplineId);
            res.json('Discipline deleted from your profile');
        }
        else {
            res.json('This discipline is not part of your profile');
        }
    },


}

module.exports = disciplineController;
