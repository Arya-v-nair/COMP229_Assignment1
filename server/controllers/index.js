let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
//let jwt = require('jsonwebtoken');
//let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
      res.render("auth/login", {
        title: "Login",
        messages: req.flash("loginMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      return res.redirect("/");
    }
  };
  
  // Login authentication using passport
  module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("loginMessage", "Authentication Error");
        return res.redirect("/login");
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const payload = {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        };
        return res.redirect("/business-contact");
      });
    })(req, res, next);
  };
  
  // display registration page for user get request
  module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
      res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      return res.redirect("/");
    }
  };
  
  // display registration page for user post request
  
  module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName,
    });
  
    User.register(newUser, req.body.password, (err) => {
      if (err) {
        console.log("Error registering new user");
        if ((err.name = "UserExistsError")) {
          req.flash("registerMessage", "Registration Error:User Already Exists");
          console.log("Error:User already Exists");
        }
        return res.render("auth/register", {
          title: "Register",
          messages: req.flash("registerMessage"),
          displayName: req.user ? req.user.displayName : "",
        });
      } else {
        return passport.authenticate("local")(req, res, () => {
          res.redirect("/business-contact");
        });
      }
    });
  };
  
  //Logout
  module.exports.performLogout = (req, res, next) => {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  };
  