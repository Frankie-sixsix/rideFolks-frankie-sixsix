const client = require('../database');

class Message {

    constructor(obj={}) {
        for (const propName in obj){
            this[propName] = obj[propName];
        }
    }

    async save(userId,idConv) {

        try {
            const sqlQuerry = {
                text: 'INSERT INTO "message"(content,sender_id,conversation_id) VALUES ($1,$2,$3)',
                values: [this.content,userId,idConv]
            }
        await client.query(sqlQuerry);
       
        } catch (error){
            console.log(error);
        }
    }

}

module.exports = Message;