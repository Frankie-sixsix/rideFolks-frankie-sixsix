const {Router} = require('express');
const router = Router();
const mainController = require('./Controller/mainController');
const userController = require('./Controller/userController');


router.get('/', mainController.test);

// Route user 
router.get('/user', userController.findAll);
router.get('/user/:id', userController.findOne);
router.post('/user', userController.addUser);
router.delete('/user/:id', userController.deleteOne);





module.exports = router;