const client = require('../database');

class Conversation {

    static async createConv(id, name=null) {

        try {
            const sqlQuerry = {
                text: 'INSERT INTO "conversation" (name) VALUES ($1) RETURNING id',
                values: [name]
            }
            
            const {rows} = await client.query(sqlQuerry);
            const idConv = rows[0].id;

            // console.log("idConv:", idConv);
            // console.log("Id user:",id);


            const sqlQuerry2 = {
                text: 'INSERT INTO "user_has_conversation" (conversation_id, user_id) VALUES ($1,$2)',
                values: [idConv,id]
            }

            await client.query(sqlQuerry2);


        } catch (error){
            console.log(error);
        }
    }

}

module.exports = Conversation;