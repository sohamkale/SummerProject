const mongoose = require('mongoose');
const postObjSchema = new mongoose.Schema({
//type, number of likes, string array of answers - no. likes, no. of points
    userId: {type: String},   //should be unique or not?
    type: {type: String},
    likes: [],
    message: {
        emojiArray: [], //empty array at first and will add emoji to it later, making it an array [emoji]
        emojiObjects: []
    }, //message -> emoji array -> every emoji has x and y coordinates
    secretAnswer: {type: String},
    name: {type: String},
    //@TODO:: we don't need expires at, because we can just query the database on DateTime.now - createdAt < whatever time we set!
    // expiresAt: {type: Date},
    revealsAt: {type: Date},
    comments: [{type: Object}] //empty array at first and will add comment to it later, making it an array [comment]
  //Check out - https://mongoosejs.com/docs/guide.html
},{
    timestamps: true,
});


module.exports =  mongoose.model('postObj', postObjSchema);