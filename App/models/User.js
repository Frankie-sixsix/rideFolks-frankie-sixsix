const client = require('../database');

class User {
    
        // Boucle qui sers a crée un objet (le this) avec les meme proprietées qu'il recoit (du form)
        constructor(obj={}) {
            for (const propName in obj){
                this[propName] = obj[propName];
            }
        }

    // Methode static async pour voir toutes les utilisateurs 
    static async findAll() {
        try {
            const {rows} = await client.query('SELECT * FROM "user"');
            return rows.map(row => new User(row));
        } catch (error) {
            console.log(error);
        }
    }

    // Methode static async pour voir un utilisateur
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

    // Methode pour mettre à jour un utilisateur, et si il n'existe pas alors on le sauvegarde en bdd
    async save() {
        
        if(this.id){
           
            //TODO methode pour la update, faire un SET column1 = value1 etc.. WHERE id = this.id (En faisant la technique pour se proteger des injectrions sql)
            const sqlQuerry = {
                text: 'SELECT * FROM "user" WHERE id=$1',
                values: [this.id]
            }
            const user = await client.query(sqlQuerry);

        
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

    static async deleteOne(id) {

        try {
            // Requete 
            const sqlQuerry = {
                text: 'DELETE FROM "user" WHERE id= $1',
                values: [id]
            }

            await client.query(sqlQuerry);
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;