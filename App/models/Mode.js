const client = require('../database');

class Mode {

    constructor(obj = {}) {
        for (const propName in obj) {
            this.label = obj.label
        }
    }

    static async save(userId, modeId) {

        try {
            const sqlQuerry2 = {
                text: 'INSERT INTO "user_has_mode"(mode_id,user_id) VALUES ($1,$2)',
                values: [modeId, userId]
            }
            await client.query(sqlQuerry2);


        } catch (error) {
            console.log(error);
        }
    }

    static async getModeId(label) {

        const sqlQuerry1 = {
            text: 'SELECT id FROM "mode" WHERE "label" = $1',
            values: [label]
        }

        const { rows } = await client.query(sqlQuerry1);
        // console.log(rows[0],"hh");

        if (rows[0] === undefined) {
            return false;
        }
        else {
            return rows[0].id;
        }

    }

    static async verifMode(userId, modeId) {

        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user_has_mode" WHERE "user_id" = $1 AND "mode_id" = $2',
                values: [userId, modeId]
            }
            const { rows } = await client.query(sqlQuerry);
            // console.log(rows[0], "rh");
            if (rows[0]) {
                return true;
            }
            else {
                // console.log("no");
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    static async deleteMode(userId,modeId){

        try {
            const sqlQuerry = {
                text:'DELETE FROM "user_has_mode" WHERE "user_id"= $1 AND "mode_id" = $2',
                values: [userId,modeId]
            }
            await client.query(sqlQuerry);

        } catch (error){
            console.log(error);
        }
    }

}

module.exports = Mode;