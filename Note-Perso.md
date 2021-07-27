## Notes

Dimanche 18/07

J'ai fait les routes pour chercher un user, chercher tout les user , et pour créer un user.
Reste a completer la methode update en faisant un SET cloumn1 = value1 etc.. WHERE id = this.id et ca devrais le faire 

Reste a clarifier le point en bdd , ainsi que les photos de profil des user.
Puis continuer en faisant les meme methodes que user pour Event, place, et groupe et faire pareil pour mode et discipline( en changeant quelques details car les utilisateurs ne pourront pas les créer eux meme)



Lundi 19/07

Voir les POINT sur sql, pour voir comment rentrer e, base de données des coordonnées,
Faire la route pour ajouter un ami a sa liste d'amis, pour que le front puisse coder le bouton pour ajouter des amies 

Problematique: 

Question: Est ce que si un utilisateur rentre un lieu visité on doit recherché si ce lieux existe en bdd et du coup donner l'id a la liste de lieu visité par l'user ? 

Est ce que si un utilisateur supprime un lieu il est supprimé aussi de la bdd ou seulement lutilisateur n'est plus relié a ce lieux ? 

Mardi 
....
{
    "last_name": "Bennett",
    "first_name": "Rue",
    "mail": "dmt@oclock.io",
    "location": " 66.66667, 2.33333",
    "password": "oxy", 
    "profile_picture": "https://64.media.tumblr.com/f97561c1c9f1ee197de6c71f902de89c/8872ee4a69c0b70b-ba/s640x960/b44b4365ab36070a4ca9c4de182cb57a6bf4c8c2.jpg"

}

Mercredi 

Configuer pg admin pour pouvoir se connecter a l'api de heroku, puis regler le probleme de gitignore 

git rm -r --cached . git add . git commit -m "remove gitignore files" git push

Configurer la route pour supprimer un event, car seul le créateur de l'vent (owner_id dans la table event) doit avoir la possibilité de le supprimer (uniquement lui), faire un truc du genre : 
- Si l'id de la peronne voulant supprimé l'event n'est pas le meme que le owner_id de l'event alors mettre un message comme quoi il n'a pas les droits 

Changer le message de retour sur la route pour ajouter un utilisateur à event, voir avec les front quoi mettre + message de la route pour ajouter un utilisateur en ami aussi 

Rajouter socket.io aux dependences cotées back sur google doc

requete liste amis:
-Rechercher les user dans la table user qui on le meme id que le friernd_user_id de la table "network" QUAND la source_id = 1
SELECT "user".* FROM "user" 
join "network" ON network.friend_user_id = "user".id
Where network.source_id = 1;

heroku: git push heroku nomBranch:main (pour push sur heroku branch main)

Mise en place jWT 
ressource: https://medium.com/@sbesnier1901/s%C3%A9curiser-une-api-avec-node-js-et-jwt-15e14d9df109

Dimanche: Mise en place du middleware security.js, qui verifie le token dans le header de la requete, si il a ete modifié ou manquant l'accées a certeines routes est refusé et si il est bon alors ou lui crée un nouveau

{
	
    "first_name": "Rue - 02",
    "mail": "dmt@oclock.io",
    "location": " 66.66667, 2.33333",
    "password": "oxy", 
    "profile_picture": "https://fr.web.img6.acsta.net/r_1280_720/newsv7/20/12/07/17/58/1442788.jpg""
}


Le .env ne marche pas sur heroku , il faut passer par les config vars sur heroku.com


Methode pour ajouter mode a evenement grace aux forms ? 
 if(this.mode){

            

                    
                    
                    // Requete pour trouver l'id du mode grace à son label
                    const sqlQuerryIdMode = {
                        text: 'SELECT id FROM "mode" WHERE "label"= $1',
                        values: [this.mode]
                    }
                    const mode_id = await client.query(sqlQuerryIdMode);

                    // Requete pour changer le mode l'event (en changeant l'id du mode)
                    const sqlQuerryUpdateEventMode = {
                        text: 'UPDATE "event_has_mode" WHERE "event_id"=$1 SET mode_id=$2',
                        values: [id,mode_id]
                    }


                    await client.query(sqlQuerryUpdateEventMode);
                }

                // Si l'utilisateur update la disicipline
                if(this.disicipline){

                    const sqlQuerryDisciplineId = {
                        text:'SELECT id FROM "discipline WHERE "name" = $1',
                        values: [this.disicipline]
                    }

                    const disicipline_id = await client.query(sqlQuerryDisciplineId);

                    const sqlQuerryUpdateDiscipline = {
                        text: 'UPDATE "event_has_discipline" WHERE "event_id"=$1 SET "discipline_id =$2',
                        values: [id,disicipline_id]
                    }

                    await client.query(sqlQuerryUpdateDiscipline);


                }


                await client.query(sqlQuerryUpdateEvent);
                console.log('Event modifié');

           

            
            }


Afficher le dernier messages de la conversation pour la route user/conversations