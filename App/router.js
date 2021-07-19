const {Router} = require('express');
const router = Router();
const mainController = require('./Controller/mainController');
const userController = require('./Controller/userController');
const eventController = require('./Controller/eventController');


router.get('/', mainController.test);

// Route user 
router.get('/users', userController.findAll);
router.get('/user/:id', userController.findOne);
router.post('/user', userController.addUser);
router.delete('/user/:id', userController.deleteOne);

// Route event
router.get('/events', eventController.findAll);
router.get('/event/:id', eventController.findOne);
router.post('/event', eventController.addEvent);
router.delete('/event/:id', eventController.deleteOne);






module.exports = router;