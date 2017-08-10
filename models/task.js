var mongoose = require('mongoose');

// define the schema for our user model
var taskSchema = mongoose.Schema({
    title        : String,
    price     : Number,
    description: String,
    till: Date,
    created:  {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    _author: mongoose.Schema.Types.ObjectId
});


module.exports = mongoose.model('Task', taskSchema);
