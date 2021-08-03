const client = require('../database');

class Conversation {

    static async createConv(id, idPArticipant, name = null) {

        try {

            // Insert dans la tables conversations, en recuperant l'id de l'insert
            const sqlQuerry = {
                text: 'INSERT INTO "conversation" (name) VALUES ($1) RETURNING id',
                values: [name]
            }

            const { rows } = await client.query(sqlQuerry);

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

            idPArticipant

            await client.query(sqlQuerry2);
            await client.query(sqlQuerry3);

            return idConv;


        } catch (error) {
            console.log(error);
        }
    }

    static async findAll(id) {

        // console.log("id",id);

            // Recuper la photo de profil d'un utilisateur qui fait partie des conversations avec lequel l'user connecter fait partie


            // Recupere les id qui font partie de la conversation:
                // SELECT user_id FROM "user_has_conversation" WHERE "conversation_id" = 1;

                    // Recupere les id de conversation quand le user_id est 25
                        // SELECT conversation_id FROM "user_has_conversation" WHERE "user_id" = 25;

                            // Recupere les id des user qui sont dans la conversation
                                //SELECT user_id FROM "user_has_conversation" WHERE "conversation_id" IN (
                                //SELECT conversation_id FROM "user_has_conversation" WHERE "user_id" = 25
                                
                                // Ancienne requete: 
                                    // SELECT date, name, "conversation".id, "user".last_name,"user".first_name, profile_picture FROM "conversation"
                                    // JOIN "user_has_conversation" ON conversation.id = conversation_id 
                                    // JOIN "user" ON "user".id = "user_has_conversation".user_id
                                    // WHERE conversation.id = $1


        try {
            // const sqlQuerry = {
            //     text: `
            //     SELECT date, name, "conversation".id, "user".last_name,"user".first_name, profile_picture FROM "conversation"
            //     JOIN "user_has_conversation" ON conversation.id = conversation_id 
            //     JOIN "user" ON "user".id = "user_has_conversation".user_id
            //     WHERE "user".id in (
	        //         SELECT user_id FROM "user_has_conversation" WHERE "conversation_id" IN (
		    //             SELECT conversation_id FROM "user_has_conversation" WHERE "user_id" = $1
	        //         )
            //     );
            //     `,
            //     values: [id]
            // }SELECT date, name, "conversation".id, "user".last_name,"user".first_name, profile_picture FROM "conversation"
                // JOIN "user_has_conversation" ON conversation.id = conversation_id 
                // JOIN "user" ON "user".id = "user_has_conversation".user_id

            // const sqlQuerry = {
            //     text: `SELECT date,name, "conversation".id FROM "conversation"
            //     JOIN "user_has_conversation" ON conversation.id = conversation_id 
            //     WHERE user_id = $1`,
            //     values:[id]
            // }


            const sqlQuerry = {
                text: `SELECT "conversation".id FROM "conversation"
                JOIN "user_has_conversation" ON conversation.id = conversation_id 
                WHERE user_id = $1`,
                values:[id]
            }



            // Select les dtaes from conversations where id = conversation_id de user_has_conversation where user_id = 1

            const { rows } = await client.query(sqlQuerry);
            // console.log('rowsss', rows);

            return rows;

        } catch (error) {
            console.log(error);
        }

    }
    static async infoOnDiscussion(idConv){

        try {
            const sqlQuerry = {
                text: `
                SELECT date, name, "conversation".id, "user".last_name,"user".first_name, profile_picture FROM "conversation"
                JOIN "user_has_conversation" ON conversation.id = conversation_id 
                JOIN "user" ON "user".id = "user_has_conversation".user_id
                    WHERE conversation.id = $1`,
                values: [idConv]
            }

            const {rows} = await client.query(sqlQuerry);
            return rows;

        } catch (error){
            console.log(error);
        }
    }

    static async quitConv(id,convId) {

        try {
            const sqlQuerry = {
                text: 'DELETE FROM "user_has_conversation" WHERE "user_id" = $1 AND "conversation_id"=$2 ',
                values: [id,convId]
            }

            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

    static async verifConv(id,convId) {

        try {
            const sqlQuerry = {
                text: 'SELECT * FROM "user_has_conversation" WHERE "user_id"=$1 AND "conversation_id"=$2',
                values: [id,convId]
            }

            const {rows} = await client.query(sqlQuerry);
                if(!rows[0]){
                    return false;  // Passer en false 
                }
                else {
                    return rows;
                }

        } catch (error){
            console.log(error);
        }
    }

    static async participate(id,idConv) {

        try {
            const sqlQuerry = {
                text:'INSERT INTO "user_has_conversation" (conversation_id, user_id) VALUES ($1,$2)',
                values: [idConv, id]
            }
            await client.query(sqlQuerry);

        } catch (error) {
            console.log(error);
        }
    }

    static async checkIfConvExist(idConv){

        try {
            const sqlQuerry = {
                text:'SELECT * FROM "conversation" WHERE id = $1',
                values: [idConv]

            }
            const {rows} = await client.query(sqlQuerry);
                if(rows[0]){
                    return true;
                } else {
                    return false;
                }

        } catch (error){
            console.log(error);
        }
    }

    static async getMessagesFromConversation(idConv){

        try {
            const sqlQuerry = {
                text:`
                SELECT "content", last_name, first_name, date, "user".id FROM "message"
                JOIN "user" ON "message".sender_id = "user".id
                WHERE conversation_id = $1 ORDER BY date`,
                values: [idConv]
            }

             const {rows} = await client.query(sqlQuerry);
             return rows;
        } catch (error) {
            console.log(error);
        }
    }



}

module.exports = Conversation;