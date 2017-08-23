var mongoose = require('mongoose');

// define the schema for our user model
var taskSchema = mongoose.Schema({
    title        : String,
    caption: String
});


module.exports = mongoose.model('TaskType', taskSchema);
