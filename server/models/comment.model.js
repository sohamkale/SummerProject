const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    commentId: {type: String}, //should be unique or not
    answer: {type: String},
    hintTaken:{type: Boolean},
    likes: [],
    score: {type: Number}
})


module.exports =  mongoose.model('comment', commentSchema);