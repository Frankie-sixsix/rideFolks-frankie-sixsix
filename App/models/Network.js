const client = require('../database');

class Network {

    constructor(obj={}) {
        for (const propName in obj){
            this[propName] = obj[propName];
        }
    }

    // Methode qui verifie si les deux utilisateur sont amies
    static async verifyfriendship(id,idFriend) {

        try {
            const sqlQuerry1 = {
                text:'SELECT * FROM "network" WHERE source_id = $1 AND friend_user_id = $2',
                values: [id,idFriend]
            }
            // Je verifie
            const {rows} = await client.query(sqlQuerry1);
            // S'il me renvoit une ligne alors je retourne une instance de Network pour prouver au controller que les deux utilisateurs sont amies
            if(rows[0]){
                return new Network(rows);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Methode pour ajouter ajouter un ami
    static async addFriend(id,idFriend) {

        try {
                const sqlQuerry1 = {
                    text: 'INSERT INTO "network"(source_id,friend_user_id) VALUES($1,$2)',
                    values:[id,idFriend]
                }
                 await client.query(sqlQuerry1);    
                
                 const sqlQuerry2 = {
                    text: 'INSERT INTO "network"(source_id,friend_user_id) VALUES($1,$2)',
                    values:[idFriend,id]
                 }
                 await client.query(sqlQuerry2);

        } catch (error) {
            console.log(error);
        }
        
    }
    

    // Methode pour supprimer un ami 
    static async deleteFriend(id,idFriend) {
        
        try {
                const sqlQueryy1 = {
                    text:'DELETE FROM "network" WHERE source_id = $1 AND friend_user_id = $2',
                    values: [id,idFriend]
                }
                await client.query(sqlQueryy1);

                const sqlQueryy2 = {
                    text:'DELETE FROM "network" WHERE source_id = $1 AND friend_user_id = $2',
                    values: [idFriend, id]
                }
                await client.query(sqlQueryy2);

                
            } catch (error) {
            console.log(error);
            }

     

    }

    static async showFriendList(id) {
        try {
            const sqlQuerry = {
                // text:'SELECT friend_user_id FROM "network" WHERE source_id = $1',
                text: `
                SELECT "user".* FROM "user" 
                join "network" ON network.friend_user_id = "user".id
                Where network.source_id = $1`,
                values: [id]
            }
            const {rows} = await client.query(sqlQuerry);
            return rows.map(row=> new Network(row));


        } catch (error) {
            console.log(error);
        }
    }
    
}

module.exports = Network;