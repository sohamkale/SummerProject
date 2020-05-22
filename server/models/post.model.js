const mongoose = require('mongoose');
const postObjSchema = new mongoose.Schema({
  /* Your code for a schema here */             //type, number of likes, string array of answers - no. likes, no. of points
    postObjId: {type: String},   //should be unique or not?
    type: {type: String},
    numLikes: {type: Number},
    message: {
        emojiArray: [{ x: {type: String}, y: {type: String}}] //empty array at first and will add emoji to it later, making it an array [emoji]
    }, //message -> emoji array -> every emoji has x and y coordinates
    secretAnswer: {type: String},
    expiresAt: {type: Date},
    /*timeElapsed: {type: Number},
    maxTime: {type: Number}, //current time + 2 hours //expire time- datetime
    hidden: {type: Boolean},*/
    comments: [] //empty array at first and will add comment to it later, making it an array [comment]
  //Check out - https://mongoosejs.com/docs/guide.html
},{
    timestamps: true,
});

module.exports =  mongoose.model('postObj', postObjSchema);