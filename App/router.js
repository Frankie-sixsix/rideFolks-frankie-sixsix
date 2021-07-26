const {Router} = require('express');
const router = Router();
const mainController = require('./Controller/mainController');
const userController = require('./Controller/userController');
const eventController = require('./Controller/eventController');
const placeController = require('./Controller/placeController');
const networkController = require('./Controller/networkController');
const security = require('../Middlewares/security');


router.get('/', mainController.test);

// Route user (reste à voir si je dois séparer la route post en une route post et une route update /!\)
router.get('/users', userController.findAll); // Recuperation de touts les utilisateurs 
router.post('/user', userController.addUser); // Création d'un utilisateur grâce a un form / UPDATE
router.get('/user/:id', userController.findOne); // Recuperation d'un utilisateur grâce a son id 
router.delete('/user/:id', security.checkjWT,userController.deleteOne); // Suppression d'un utilisateur (jWT)

// Route event
router.get('/events', eventController.findAll); // Recuperation de touts les evenements 
router.get('/event/:id', eventController.findOne); // Recuperation d'un evenement grâce a son id 
router.post('/user/:id/event', security.checkjWT, eventController.addEvent); // Création d'un evenement / UPDATE (jWT)
router.delete('/event/:id', eventController.deleteOne); // Suppression d'un evenement (jWT)

router.post('/user/:id/event/:idEvent', security.checkjWT,  eventController.participate); // Route pour participer à un evenement (jWT)

// Route place
router.post('/user/:id/place', placeController.addPlace); // Création et ajout d'un lieux visité au profil de l'utilisateur / UPDATE (jWT)
router.delete('/user/:id/place/:idPlace', security.checkjWT,  placeController.deletePlace); // (jWT)


// Route network
router.post('/user/:id/user/:idFriend', security.checkjWT,  networkController.addFriend); // Ajouter un ami (jWT)
router.delete('/user/:id/user/:idFriend', security.checkjWT,  networkController.deleteFriend); // Supprimer un ami (jWT)
router.get('/user/:id/friend', security.checkjWT,  networkController.showFriendList); // Supprimer un ami (jWT)


// Route test socket.io
router.get('/socket', (req,res)=>{
    res.sendFile(__dirname + '/static/index.html');
})

// Route pour se logger

router.post('/login',userController.authentifiacation);


module.exports = router;