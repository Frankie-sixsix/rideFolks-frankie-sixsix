const client = require('../database');

class User {
    
        constructor(obj={}) {
            for (const propName in obj){
                this[propName] = obj[propName];
            }
        }

    static async findAll() {
        try {
            const {rows} = await client.query('SELECT * FROM "user"');
            return rows.map(row => new User(row));
        } catch (error) {
            console.log(error);
        }
    }

    static async findOne(id) {
        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user" WHERE id=$1',
                values: [id]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]) {
                return new User(rows[0]);
            }
            return null;

        } catch (error){
            console.log(error);
        }
    }

    async save() {
        
        if(this.id){
            //TODO methode pour la update 
        }
        else {
            try {
                const sqlQuerry = {
                    text: 'INSERT INTO "user"(last_name,first_name,mail,location,password,profile_picture) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
                    values: [
                        this.last_name,
                        this.first_name,
                        this.mail,
                        this.location,
                        this.password,
                        this.profile_picture   
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

module.exports = User;