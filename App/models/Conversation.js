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

    static async findAll(id) {

        // console.log("id",id);

        try {
            const sqlQuerry = {
                text: `SELECT date, name FROM "conversation"
                JOIN "user_has_conversation" ON conversation.id = conversation_id 
                WHERE user_id = $1`,
                values: [id]
            }
            // Select les dtaes from conversations where id = conversation_id de user_has_conversation where user_id = 1

            const {rows} = await client.query(sqlQuerry);
            // console.log('rowsss', rows);

            return rows;

        } catch (error) {
            console.log(error);
        }
       
    }

}

module.exports = Conversation;