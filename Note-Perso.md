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