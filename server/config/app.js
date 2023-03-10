/*
Assignment - 1
Arya Vijimon Nair
Student ID : 301249594
Course CODE : COMP229
Course name : Web Application Development
file name : app.js
*/
//installed third-party packages
let  createError = require('http-errors');
let  express = require('express');
let  path = require('path');
let  cookieParser = require('cookie-parser');
let  logger = require('morgan');

let session = require('express-session');
let passport = require('passport');

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//setup database

let mongoose = require('mongoose');
let db = require('./db')



//point mongoose to db uri

mongoose.connect(db.URI,{useNewUrlParser: true} );

let mongodb = mongoose.connection;
mongodb.on('error', console.error.bind(console, 'Connection Error'));
mongodb.once('open', ()=>{
  console.log('Connected to mongodb...');
});

// create a User Model Instance(First create model and then add below lines)
let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let  indexRouter = require('../routes/index');
let  usersRouter = require('../routes/users');
let  businessContactRouter = require('../routes/business_contact');

let  app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');//express -e did this

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
//to add node_modules
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/business-contact',businessContactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title : 'Error'});
});

module.exports = app;
