const client = require('../database');

class Discipline {

    constructor(obj = {}) {
        for (const propName in obj) {
            this.name = obj.name
        }
    }

    static async save(userId, disciplineId) {

        try {
            const sqlQuerry2 = {
                text: 'INSERT INTO "user_has_discipline"(discipline_id,user_id) VALUES ($1,$2)',
                values: [disciplineId, userId]
            }
            await client.query(sqlQuerry2);


        } catch (error) {
            console.log(error);
        }
    }


    static async getDisciplineId(name) {

        const sqlQuerry1 = {
            text: 'SELECT id FROM "discipline" WHERE "name" = $1',
            values: [name]
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

    static async verifDiscipline(userId, disciplineId) {

        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user_has_discipline" WHERE "user_id" = $1 AND "discipline_id" = $2',
                values: [userId, disciplineId]
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

    static async deleteDiscipline(userId,disciplineId){

        try {
            const sqlQuerry = {
                text:'DELETE FROM "user_has_discipline" WHERE "user_id"= $1 AND "discipline_id" = $2',
                values: [userId,disciplineId]
            }
            await client.query(sqlQuerry);

        } catch (error){
            console.log(error);
        }
    }

    static async getDiscipline(userId){

        try {
            const sqlQuerry = {
                text:`SELECT "name" FROM "discipline"
                JOIN "user_has_discipline" ON "user_has_discipline".discipline_id = "discipline".id
                WHERE user_id = $1`,
                values: [userId]
            }
            const {rows} = await client.query(sqlQuerry);
            return rows;
        } catch (error){
            console.log(error);
        }
    }


}

module.exports = Discipline;