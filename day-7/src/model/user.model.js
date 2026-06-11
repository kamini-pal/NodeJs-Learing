const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : String,
    email : String,
    password : String
});


const userModel = mongoose('users' , userSchema);

module.exports = userModel;