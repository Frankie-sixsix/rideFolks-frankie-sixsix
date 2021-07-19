const client = require('../database');

class Event {

    constructor(obj={}) {
        for (const propName in obj){
            this[propName] = obj[propName];
        }
    }

    // Methode static async pour voir touts les lieux visitées 
    static async findAll() {
        try {
            const {rows} = await client.query('SELECT * FROM "event"');
            return rows.map(row => new Event(row));
        } catch (error) {
            console.log(error);
        }
    }

    // Methode static async pour voir un utilisateur
    static async findOne(id) {
        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "event" WHERE id=$1',
                values: [id]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]) {
                return new Event(rows[0]);
            }
            return null;

        } catch (error){
            console.log(error);
        }
    }

    // Methode pour mettre à jour un utilisateur, et si il n'existe pas alors on le sauvegarde en bdd
    async save() {
        
        // Update
        if(this.id){
           
            //TODO methode pour la update, faire un SET column1 = value1 etc.. WHERE id = this.id (En faisant la technique pour se proteger des injectrions sql)
            // const sqlQuerry = {
            //     text: 'SELECT * FROM "user" WHERE id=$1',
            //     values: [this.id]

            // }
            const sqlQuerry = {
                text: `UPDATE "user" 
                    SET location = $1,
                    date = $2,
                    start_time = $3
                    WHERE id = $4
                    `,
                values: [
                    this.location,
                    this.date,
                    this.start_time,
                    this.id ]
            }
            await client.query(sqlQuerry);
            console.log('Utilisateur modifié');

        
        }
        // Save
        else {
            try {
                const sqlQuerry = {
                    text: 'INSERT INTO "event"(location,date,start_time,owner_id) VALUES($1,$2,$3,$4) RETURNING id',
                    values: [
                        this.location,
                        this.date,
                        this.start_time,
                        this.owner_id
                    ]
                }

                const {rows} = await client.query(sqlQuerry);
                this.id = rows[0].id;
        } catch (error) {
            console.log(error);
            throw new Error(error.details);
        }
    }
    }

}

module.exports = Event;