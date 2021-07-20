const client = require('../database');

class Place {

    constructor(obj={}) {
        for (const propName in obj){
            this[propName] = obj[propName];
        }
    }

    async save(id) {
        
        // Update
        if(this.id){

            // console.log(this.id);
           
            const sqlQuerry = {
                text: `
                    UPDATE "place" 
                    SET address = $1
                    WHERE id = $2
                    `,
                values: [
                    this.address,
                    this.id ]
            }
            await client.query(sqlQuerry);
            console.log('Lieu modifié');

        
        }
        // Save
        else {
            try {
                const sqlQuerry = {
                    text: 'INSERT INTO "place"(address) VALUES($1) RETURNING id',
                    values: [
                        this.address
                    ]
                }

                const {rows} = await client.query(sqlQuerry);
                this.id = rows[0].id;

                //2eme requete pour faire une entrée dans user has place
                const sqlQuerry2 = {
                    text: 'INSERT INTO user_has_place(place_id,user_id) VALUES ($1,$2)',
                    values: [this.id, id]
                }
                await client.query(sqlQuerry2);

        } catch (error) {
            console.log(error);
            throw new Error(error.details);
        }
    }
    }

    static async deleteOne(idPlace) {

        try {
            
            const sqlQuerry = {
                text: 'DELETE FROM place WHERE id= $1',
                values: [idPlace]
            }

            await client.query(sqlQuerry);
            
        } catch (error) {
            console.log(error);
        }
    }

    static async findOne(id) {
        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "place" WHERE id=$1',
                values: [id]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]) {
                return new Place(rows[0]);
            }
            return null;

        } catch (error){
            console.log(error);
        }
    }
}

module.exports = Place;