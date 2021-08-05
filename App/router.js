const {Router} = require('express');
const router = Router();
const {
    mainController,
    userController,
    eventController,
    placeController,
    networkController,
    conversationController,
    modeController,
    disciplineController,
    messageController,
} = require('./Controller/index');
const security = require('../Middlewares/security');



router.get('/', mainController.test);

// Route profil

router.get('/profil', security.checkjWT, userController.getProfile); // Affiche la page profil de l'utilisateur connecté
router.post('/login',userController.authentifiacation); // Pour se connecter (login)



// Route user 
router.post('/user', userController.addUser); // Création d'un utilisateur grâce a un form 
router.get('/users', userController.findAll); // Recuperation de touts les utilisateurs 
router.patch('/user', security.checkjWT, userController.updateUser); // UPDATE d'un user
router.delete('/user', security.checkjWT,userController.deleteOne); // Suppression de son compte (jWT)

// Route user qui son disponnible 
router.get('/users/available', security.checkjWT,userController.showAvailableUsers); 


// Route pôur chnager availabity (switch) on et une off 
router.get('/user/availability/on', security.checkjWT, userController.availabilityOn); // Route pour afficher toutes les conversations d'un utilisateur 
router.get('/user/availability/off', security.checkjWT, userController.availabilityOff); // Route pour afficher toutes les conversations d'un utilisateur 

// Route user/mode
router.post('/user/mode', security.checkjWT, modeController.addMode); // Ajout d'un mode au profil utilisateur 
router.delete('/user/mode', security.checkjWT, modeController.deleteMode); // Suppression d'un mode au profil utilisateur 


// Route user/discipline
router.post('/user/discipline', security.checkjWT, disciplineController.addDiscipline); // Ajout d'une discipline au profil utilisateur 
router.delete('/user/discipline', security.checkjWT, disciplineController.deleteDiscipline); // Suppression d'une discipline au profil utilisateur 


// Route user/conversation
// router.get('/user/conversations', security.checkjWT, conversationController.findAll); // Route pour afficher toutes les conversations (jWT)
router.get('/user/conversation/:idConv', security.checkjWT,conversationController.getMessagesFromConv); // Recuperation des messages d'une conversation (jWT)
router.post('/user/message/conversation/:idConv', security.checkjWT,messageController.createMessage); // Creation d'un message (jWT)


// Route user/conversation
router.get('/user/conversations', security.checkjWT, conversationController.findAll); // Route pour afficher toutes les conversations d'un utilisateur 
router.post('/user/conversation', security.checkjWT, conversationController.createConv); // Route pour créer une conversation (jWT)
router.delete('/user/conversation/:id',security.checkjWT, conversationController.quitConv); // Route pour quitter une conversation
router.get('/user/particpate/conversation/:id', security.checkjWT, conversationController.participateConv); // Route pour participer a une conversation


// Route user/place
router.post('/user/place',security.checkjWT, placeController.addPlace); // Création et ajout d'un lieux visité au profil de l'utilisateur / UPDATE (jWT)
router.delete('/user/place/:idPlace', security.checkjWT,  placeController.deletePlace); // Suppression (jWT)



// Route network
router.get('/user/friends', security.checkjWT,  networkController.showFriendList); // Affiche la liste d'amis
router.post('/user/add/user/:idFriend', security.checkjWT,  networkController.addFriend); // Ajouter un ami (jWT)
router.delete('/user/delete/user/:idFriend', security.checkjWT,  networkController.deleteFriend); // Supprimer un ami (jWT)




// Route event
router.post('/user/event', security.checkjWT, eventController.addEvent); // Création d'un evenement / UPDATE (jWT)
router.post('/user/event/:idEvent', security.checkjWT,  eventController.participate); // Route pour participer à un evenement (jWT)
router.get('/events', eventController.findAll); // Recuperation de touts les evenements 
router.get('/event/:id', eventController.findOne); // Recuperation d'un evenement grâce a son id 
router.delete('/event/:id', eventController.deleteOne); // Suppression d'un evenement (jWT)






// Route pour afficher profil user grace a son id 
router.get('/user/:id', userController.findOne); // Recuperation d'un utilisateur grâce a son id 




module.exports = router;
