const {Router} = require('express');
const router = Router();
const mainController = require('./Controller/mainController');

router.get('/', mainController.test);


module.exports = router;