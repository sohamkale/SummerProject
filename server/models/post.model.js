const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema ({
    id: {type: String, unique: true}, 
    message: {type: String},
    secretAnswer: {type: String},
    timeElapsed: {type: Date},
    maxTime: {type: Date},
    hidden: {type: Boolean},
    comments: [{
        id: {type: String, unique: true}, //should be same as the id of the person who posted the comment
        commentAns: {type: String}
    }]
    //Thread objects
})

const postObj = mongoose.model('postObj', 'postSchema');
module.exports = { postObj };