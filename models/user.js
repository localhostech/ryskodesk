var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose')

// define the schema for our user model
var userSchema = mongoose.Schema({
    email        : String,
    password     : String,
    username: String,
    firstname: String,
    lastname: String,
    spec: String,
    balance: Number,
    status: String,
    last: Date
});

userSchema.plugin(passportLocalMongoose);
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
