const client = require('../database');

class Conversation {
    static async test (id, participant){

        const idConversationCheck = await Conversation.checkIdConversation(id,participant);
        if(idConversationCheck){
            idConvv = idConversationCheck;
            return idConvv;
        }
        else {
            idConvv = await Conversation.createConv(id, participant);
            
        }
    

    }

    static async checkIdConversation (id, idPArticipant){
        try{
            //TEST 
            const sqlQuerryCheck = {
                text: `SELECT conversation_id FROM user_has_conversation WHERE user_id = $1 and conversation_id in(
                    SELECT conversation_id FROM user_has_conversation WHERE user_id = $2);`,
                values: [id, idPArticipant]
            }
            const { rows } = await client.query(sqlQuerryCheck);
            // console.log('rows = ', rows[0]?.conversation_id);
            return rows[0]?.conversation_id;
            
            //TEST
        } catch (error){
            console.log(error);
        }
    }
    static async createConv(id, idPArticipant, name = "Conversation") {

        try {
            //TEST 
            // const sqlQuerryCheck1 = {
            //     text: 'select conversation_id from user_has_conversation where user_id = $1',
            //     values: [id]
            // }
            // const idCheck1 = await client.query(sqlQuerryCheck1);
            // console.log('IDcheck1=', idCheck1);

            // const sqlQuerryCheck2 = {
            //     text: 'select conversation_id from user_has_conversation where user_id = $1',
            //     values: [idPArticipant]
            // }
            // const idCheck2 = await client.query(sqlQuerryCheck2);
            // console.log('IDcheck2=', idCheck2);


            //     if(idCheck1 === idCheck2){
            //         return idCheck1;
            //     }


            //TEST


            // Insert dans la tables conversations, en recuperant l'id de l'insert
            const sqlQuerry1 = {
                text: 'INSERT INTO "conversation" (name) VALUES ($1) RETURNING id',
                values: [name]
            }

            const { rows } = await client.query(sqlQuerry1);

            // On stock l'id de l'insert dans une const 
            const idConv = rows[0].id;

            // console.log("idConv:", idConv);
            // console.log("Id user:",id);


            // Insert dans la table de liaison avec l'id de la conversation aisni que l'id de l'utilisateur 
            const sqlQuerry2 = {
                text: 'INSERT INTO "user_has_conversation" (conversation_id, user_id) VALUES ($1,$2)',
                values: [idConv, id]
            }

            // Je récupere le dernier message de la conversation avec l'idConv


            const sqlQuerry3 = {
                text: 'INSERT INTO "user_has_conversation" (conversation_id, user_id) VALUES ($1,$2)',
                values: [idConv, idPArticipant]
            }

           

            await client.query(sqlQuerry2);
            await client.query(sqlQuerry3);

            return idConv;


        } catch (error) {
            console.log(error);
        }
    }

    static async findAll(id) {

        try {

            const sqlQuerry = {
                text: `SELECT date,name, "conversation".id FROM "conversation"
                JOIN "user_has_conversation" ON conversation.id = conversation_id 
                WHERE user_id = $1`,
                values: [id]
            }

            const { rows } = await client.query(sqlQuerry);
            return rows;

        } catch (error) {
            console.log(error);
        }

    }
    static async infoOnConversation(idConv, idUser) {

        try {

            const sqlQuerry = {
                text: `
                    SELECT last_name, first_name, profile_picture, "user".id FROM "user"
                    JOIN "user_has_conversation" ON user_id = "user".id
                    WHERE conversation_id = $1 AND "user".id != $2
                `,
                values: [idConv, idUser]
            }


            const { rows } = await client.query(sqlQuerry);
            return rows;

        } catch (error) {
            console.log(error);
        }
    }

    static async quitConv(id, convId) {

        try {
            const sqlQuerry = {
                text: 'DELETE FROM "user_has_conversation" WHERE "user_id" = $1 AND "conversation_id"=$2 ',
                values: [id, convId]
            }

            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

    static async verifConv(id, convId) {

        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user_has_conversation" WHERE "user_id"=$1 AND "conversation_id"=$2',
                values: [id, convId]
            }

            const { rows } = await client.query(sqlQuerry);
            if (!rows[0]) {
                return false;
            }
            else {
                return rows;
            }

        } catch (error) {
            console.log(error);
        }
    }

    static async participate(id, idConv) {

        try {
            const sqlQuerry = {
                text: 'INSERT INTO "user_has_conversation" (conversation_id, user_id) VALUES ($1,$2)',
                values: [idConv, id]
            }
            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

    static async checkIfConvExist(idConv) {

        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "conversation" WHERE id = $1',
                values: [idConv]

            }
            const { rows } = await client.query(sqlQuerry);
            if (rows[0]) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

    static async getMessagesFromConversation(idConv) {

        try {
            const sqlQuerry = {
                text: `
                SELECT "content", last_name, first_name, date, "user".id FROM "message"
                JOIN "user" ON "message".sender_id = "user".id
                WHERE conversation_id = $1 ORDER BY date`,
                values: [idConv]
            }

            const { rows } = await client.query(sqlQuerry);
            return rows;
        } catch (error) {
            console.log(error);
        }
    }




}

module.exports = Conversation;