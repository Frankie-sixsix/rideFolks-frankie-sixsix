const client = require('../database');
const UserFront = require('./UserFront');

class User {
    
        // Boucle qui sers a crée un objet (le this) avec les meme proprietées qu'il recoit (du form)
        // Pour enregistrer en base de données 
        constructor(obj={}) {
            for (const propName in obj){
                this[propName] = obj[propName];
            }
        }

    // Methode static async pour voir toutes les utilisateurs 
    static async findAll() {
        try {
            const {rows} = await client.query('SELECT * FROM "user"');
            return rows.map(row => new UserFront(row));

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
                return new UserFront(rows[0]);                
            }
            

        } catch (error){
            console.log(error);
        }
    }

    // Methode pour mettre à jour un utilisateur, et si il n'existe pas alors on le sauvegarde en bdd
    async save() {
        try {

        if(this.id){
           
            const sqlQuerry = {
                text: `UPDATE "user" 
                    SET last_name = $1,
                    first_name = $2,
                    email = $3,
                    location = $4,
                    language = $5,
                    description = $6,
                    password = $7,
                    profile_picture = $8
                    WHERE id = $9
                    `,
                values: [
                    this.last_name,
                    this.first_name,
                    this.email,
                    this.location,
                    this.language,
                    this.description,
                    this.password,
                    this.profile_picture,
                    this.id]
            }
            await client.query(sqlQuerry);
            console.log('Utilisateur modifié');

        
        }
        else {
            
                const sqlQuerry = {
                    text: 'INSERT INTO "user"(last_name,first_name,email,location,password,profile_picture) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
                    values: [
                        this.last_name,
                        this.first_name,
                        this.email,
                        this.location,
                        this.password,
                        this.profile_picture   
                    ]
                }

                const {rows} = await client.query(sqlQuerry);
                this.id = rows[0].id;
        } 
        
    }catch (error) {
            console.log(error);
            // throw new Error(error.details);
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

    static async verifyEmail(email) {
        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user" WHERE email = $1',
                values:[email]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]){
                return {};
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getPassword (email) {
        try {
            const sqlQuerry = {
                text: 'SELECT password, id, last_name, first_name FROM "user" WHERE email = $1',
                values:[email]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]){
                return rows[0];
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getMessages(id) {
        try {
            const sqlQuerry = {
                text: `
                SELECT content, conversation_id, date FROM "message"
                JOIN "user" ON message.sender_id = "user".id 
                WHERE "user".id = $1`,
                values: [id]
            }
            const {rows} = await client.query(sqlQuerry);
            if (rows[0]){
                return rows[0];
            }
        } catch (error) {
            console.log(error);
        }
    }
    }




module.exports = User;