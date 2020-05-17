const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    id: {type: String, unique: true}, 
    commentAns: {type: String}
    //Thread objects
})

const postObj = mongoose.model('postObj', 'postSchema', 'postObj');
module.exports = { postObj };