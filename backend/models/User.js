const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema 

const UserSchema = new Schema({
    name : { 
        type: String,
        trim: true,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
},
{
    timestamps: true
});

UserSchema.pre('save', function(next) {

    this.name = this.name.replace(/\s\s+/g, ' ');

    next();
});

module.exports = User = mongoose.model('users',  UserSchema);

