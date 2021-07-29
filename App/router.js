const {Router} = require('express');
const router = Router();
const mainController = require('./Controller/mainController');
const userController = require('./Controller/userController');
const eventController = require('./Controller/eventController');
const placeController = require('./Controller/placeController');
const networkController = require('./Controller/networkController');
const conversationController = require('./Controller/conversationController');
const modeController = require('./Controller/modeController');
const disciplineController = require('./Controller/disciplineController');
const messageController = require('./Controller/messageController');
const security = require('../Middlewares/security');


router.get('/', mainController.test);
// Route place

// Route user (reste à voir si je dois séparer la route post en une route post et une route update /!\)
router.get('/users', userController.findAll); // Recuperation de touts les utilisateurs 
router.post('/user', userController.addUser); // Création d'un utilisateur grâce a un form 
router.patch('/user', security.checkjWT, userController.updateUser); // UPDATE
router.post('/user/message/conversation/:idConv', security.checkjWT,messageController.createMessage); // Creation d'un message (jWT)


router.post('/user/mode', security.checkjWT, modeController.addMode); // Ajout d'un mode au profil utilisateur 
router.post('/user/discipline', security.checkjWT, disciplineController.addDiscipline); // Ajout d'une discipline au profil utilisateur 
router.post('/user/place',security.checkjWT, placeController.addPlace); // Création et ajout d'un lieux visité au profil de l'utilisateur / UPDATE (jWT)

router.delete('/user/mode', security.checkjWT, modeController.deleteMode); // Suppression d'un mode au profil utilisateur 
router.delete('/user/discipline', security.checkjWT, disciplineController.deleteDiscipline); // Suppression d'une discipline au profil utilisateur 
router.delete('/user/place/:idPlace', security.checkjWT,  placeController.deletePlace); // Suppression (jWT)

router.get('/user/:id', userController.findOne); // Recuperation d'un utilisateur grâce a son id 
router.delete('/user/:id', security.checkjWT,userController.deleteOne); // Suppression d'un utilisateur (jWT)
router.get('/profil', security.checkjWT, userController.getProfile);

// Route event
router.get('/events', eventController.findAll); // Recuperation de touts les evenements 
router.get('/event/:id', eventController.findOne); // Recuperation d'un evenement grâce a son id 
router.post('/user/:id/event', security.checkjWT, eventController.addEvent); // Création d'un evenement / UPDATE (jWT)
router.delete('/event/:id', eventController.deleteOne); // Suppression d'un evenement (jWT)

router.post('/user/:id/event/:idEvent', security.checkjWT,  eventController.participate); // Route pour participer à un evenement (jWT)



// Route network
router.post('/user/:id/user/:idFriend', security.checkjWT,  networkController.addFriend); // Ajouter un ami (jWT)
router.delete('/user/:id/user/:idFriend', security.checkjWT,  networkController.deleteFriend); // Supprimer un ami (jWT)
router.get('/user/:id/friend', security.checkjWT,  networkController.showFriendList); // Supprimer un ami (jWT)

// Route conversation

router.post('/user/conversation', security.checkjWT, conversationController.createConv); // Route pour créer une conversation (jWT)
router.delete('/user/conversation/:id',security.checkjWT, conversationController.quitConv); // Route pour quitter une conversation
router.get('/user/particpate/conversation/:id', security.checkjWT, conversationController.participateConv); // Route pour participer a une conversation


// Route test socket.io
router.get('/socket', (req,res)=>{
    res.sendFile(__dirname + '/static/index.html');
})

// Route pour se logger

router.post('/login',userController.authentifiacation);

router.get('/user/conv', security.checkjWT, conversationController.findAll); // Route pour afficher toutes les conversations d'un utilisateur 

module.exports = router;