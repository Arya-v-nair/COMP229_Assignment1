var express = require('express');
var router = express.Router();


let indexController = require('../controllers/index');
/* GET home page. */
router.get('/', indexController.displayHomePage);
 
/* GET home page. */
router.get('/home', indexController.displayHomePage);
/* GET about page. */
router.get('/about', indexController.displayAboutPage);
/* GET project page. */
router.get('/projects', indexController.displayProjectsPage);
/* GET services page. */
router.get('/services', indexController.displayServicesPage);
/* GET contact me  page. */
router.get('/contact', indexController.displayContactPage);
/* GET login page. */
router.get('/login', indexController.displayLoginPage);
 
/* Post Route for process the login page. */
router.post('/login', indexController.processLoginPage);

/* GET Route for display the register page. */
router.get('/register', indexController.displayRegisterPage);

/* Post Route for process  the regiter page. */
router.post('/register', indexController.processRegisterPage);

/** GET route to logout  */
router.get('/logout', indexController.performLogout);



module.exports = router;
