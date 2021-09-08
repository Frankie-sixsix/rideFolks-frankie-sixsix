const client = require('../database');

class Message {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async save(message, userId, idConv) {

        try {

            // Enlever la possibilité d'envoyé un message vide ? 
            const sqlQuerry = {
                text: 'INSERT INTO "message"(content,sender_id,conversation_id) VALUES ($1,$2,$3)',
                values: [message, userId, idConv]
            }
            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Message;