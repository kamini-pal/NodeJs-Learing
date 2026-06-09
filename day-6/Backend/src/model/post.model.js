const mongoose = require('mongoose');


const postshema = new mongoose.Schema({
    image : String,
    caption : String
});

const PostModel = mongoose.model('Post', postshema);

module.exports = PostModel;