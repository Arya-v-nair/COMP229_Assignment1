let mongoose = require('mongoose');

// create a model class
let BusinessContact = mongoose.Schema({
    name: String,
    contact_number: String,
    email: String
},
{
    collection: "business_contact"
});

module.exports = mongoose.model('contactList', BusinessContact);
