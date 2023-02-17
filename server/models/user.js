
// Model for user created with username,email and password
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username : {
            type: String,
            default : '',
            trim : true,
            required :'username is required'

        },
        email:{
            type: String,
            default : '',
            trim : true,
            required :'email is required'

        },
        displayName :{
            type: String,
            default : '',
            trim : true,
            required :'display Name  is required'

        },
        created :{
            type:Date,
            default: Date.now

        },
        updated :{
            type:Date,
            default: Date.now

        }
    }, {

    collection: "users"

});

let options = ({missingPasswordError:'Wrong/ Missing Password'});

User.plugin(passportLocalMongoose,options);

module.exports.User = mongoose.model('User',User);
