var mongoose = require('mongoose');

// define the schema for our user model
var taskSchema = mongoose.Schema({
    title        : String,
    price     : Number,
    description: String,
    till: Date,
    _responsible: [{ type : mongoose.Schema.Types.ObjectId}],
    _implements: mongoose.Schema.Types.ObjectId,
    created:  {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    _author: mongoose.Schema.Types.ObjectId,
    doneMessage: String,
    type: [{ type : mongoose.Schema.Types.ObjectId}],
    status: String
});


module.exports = mongoose.model('Task', taskSchema);
