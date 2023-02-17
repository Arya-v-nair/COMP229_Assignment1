

let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();

let passport = require('passport')

let businessContactController = require('../controllers/business_contact');

function requireAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Business Contact List page - READ Operation */
router.get('/', businessContactController.displayBusinessContactList);


/* GET Route for creating new Business Contact page - CREATE Operation */
router.get('/add',requireAuth, businessContactController.displayAddPage);

/* Post Route for creating new Business Contact page - CREATE Operation */
router.post('/add',requireAuth, businessContactController.processAddPage);


/* GET Route for the Business Contact page- Update Operation */
router.get('/edit/:id',requireAuth, businessContactController.displayEditPage);

/* Post Route for the Business Contact page - Update Operation */
router.post('/edit/:id', requireAuth,businessContactController.processEditPage);


/* GET Route for the Delete Business Contact page - Delete Operation */
router.get('/delete/:id',requireAuth, businessContactController.performDelete);
module.exports = router;