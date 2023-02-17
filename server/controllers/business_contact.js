let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

// create a reference to the model
let business_contact = require('../models/business_contact');

module.exports.displayBusinessContactList = (req, res, next) => {
  business_contact.find((err, contactList) => {
      if (err) {
        return console.error(err);
      } else {
        res.render("business_contact/list", {
          title: "Business Contact List",
          businessContactList: contactList,
          displayName: req.user ? req.user.displayName : "",
        });
      }
    });
  };

module.exports.displayAddPage = (req, res, next) => {
  res.render("business_contact/add", {
    title: "Add a Contact ",
    displayName: req.user ? req.user.displayName : "",
  });
};


module.exports.processAddPage = (req, res, next) => {
    let newBusinessContact = business_contact({
        name: req.body.name,
        contact_number: req.body.contact_number,
        email: req.body.email
    });

    business_contact.create(newBusinessContact, (err, BusinessContact) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.redirect("/business-contact");
        }
      });
    };


    module.exports.displayEditPage = (req, res, next) => {
        let id = req.params.id;
        business_contact.findById(id, (err, ContactToEdit) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            res.render("business_contact/edit", {
              title: "Edit Business Contact ",
              contact: ContactToEdit,
              displayName: req.user ? req.user.displayName : "",
            });
          }
        });
      };

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusinessContact = business_contact({
    _id: id,
        name: req.body.name,
        contact_number: req.body.contact_number,
        email: req.body.email
    });

    business_contact.updateOne({ _id: id }, updatedBusinessContact, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.redirect("/business-contact");
        }
      });
    };
    

    module.exports.performDelete = (req, res, next) => {
        let id = req.params.id;
        business_contact.remove({ _id: id }, (err) => {
          if (err) {
            console.log(err);
            res.end(err);
          } else {
            res.redirect("/business-contact");
          }
        });
      };
      