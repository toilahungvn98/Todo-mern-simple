const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoListSchema = new Schema({
    title : {
        type : String,
        trim : true,
        required : true
    }
});
TodoListSchema.pre('save', function(next) {

    this.title = this.title.replace(/\s\s+/g, ' ');

    next();
});


module.exports = TodoList = mongoose.model('todolist',TodoListSchema);