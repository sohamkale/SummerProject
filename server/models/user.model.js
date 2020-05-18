const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  /* Your code for a schema here */
    id: {type: String, unique: true}, 
    name: {type: String},
    email: {type: String, unique: true},
    currLevel: {type: Number},
    friends: [{
        type: String
        // id: {type: String, unique: true}
    }]
  //Check out - https://mongoosejs.com/docs/guide.html
});

module.exports =  mongoose.model('user', userSchema);