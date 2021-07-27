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

    // Methode pour mettre à jour un evenement, et si il n'existe pas alors on le sauvegarde en bdd
    async save(id) {
        
        
            // Update
            if(this.id){
                
            
                    const sqlQuerryUpdateEvent = {
                        text: `UPDATE "event" 
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
                    return await client.query(sqlQuerryUpdateEvent)
            }
        
       
        // Save
        else {
            try {
                const sqlQuerryCreateEvent = {
                    text: 'INSERT INTO "event"(location,date,start_time,owner_id) VALUES($1,$2,$3,$4) RETURNING id',
                    values: [
                        this.location,
                        this.date,
                        this.start_time,
                        id
                    ]
                }

                

                const {rows} = await client.query(sqlQuerryCreateEvent);
                this.id = rows[0].id;
        } catch (error) {
            console.log(error);
            throw new Error(error.details);
        }
    }
    }
    
    

    // Methode pour supprimer un evenement
    static async deleteOne(id) {

        try {
            // Requete protégé
            const sqlQuerry = {
                text: 'DELETE FROM "event" WHERE id= $1',
                values: [id]
            }

            await client.query(sqlQuerry);
            
        } catch (error) {
            console.log(error);
        }
    }

    static async participate(id,idEvent) {

        try {
            const sqlQuerry = {
                text:'INSERT INTO "user_participate_event" (event_id,user_id) VALUES ($1,$2)',
                values: [idEvent, id]
            }
            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Event;