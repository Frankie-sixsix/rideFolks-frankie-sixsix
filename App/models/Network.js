const client = require('../database');

class Network {

    constructor(obj={}) {
        for (const propName in obj){
            this[propName] = obj[propName];
        }
    }

    static async addFriend(id,idFriend) {

        try {
            const sqlQuerry = {
                text: 'INSERT INTO "network"(source_id,friend_user_id) VALUES($1,$2)',
                values:[id,idFriend]
            }
             await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Network;