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
router.delete('/user/:id', userController.deleteOne); // Suppression d'un utilisateur 

// Route event
router.get('/events', eventController.findAll); // Recuperation de touts les evenements 
router.get('/event/:id', eventController.findOne); // Recuperation d'un evenement grâce a son id 
router.post('/user/:id/event', eventController.addEvent); // Création d'un evenement / UPDATE
router.delete('/event/:id', eventController.deleteOne); // Suppression d'un evenement 

router.post('/user/:id/event/:idEvent', eventController.participate); // Route pour participer à un evenement 

// Route place
router.post('/user/:id/place', placeController.addPlace); // Création et ajout d'un lieux visité au profil de l'utilisateur / UPDATE
router.delete('/user/:id/place/:idPlace', placeController.deletePlace);


// Route network
router.post('/user/:id/user/:idFriend', networkController.addFriend); // Ajouter un ami 
router.delete('/user/:id/user/:idFriend', networkController.deleteFriend); // Supprimer un ami 
router.get('/user/:id/friend', networkController.showFriendList); // Supprimer un ami 


// Route test socket.io
router.get('/socket', (req,res)=>{
    res.sendFile(__dirname + '/static/index.html');
})

// Route pour se logger

router.post('/login',userController.authentifiacation);


module.exports = router;