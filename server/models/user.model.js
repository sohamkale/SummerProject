const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  /* Your code for a schema here */
    userId: {type: String, unique: true}, 
    name: {type: String},
    email: {type: String, unique: true},
    currLevel: {type: Number},
    totScore: {type: Number},
    friends: [{
        type: String
        // id: {type: String, unique: true}
    }],
    profileImage: {type: String}
    //need to add comments and posts that the user has made that haven't been expired (need to think if its necessary)
  //Check out - https://mongoosejs.com/docs/guide.html
});

module.exports =  mongoose.model('user', userSchema);