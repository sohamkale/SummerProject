const mongoose = require('mongoose');

const postObjSchema = new mongoose.Schema({
  /* Your code for a schema here */
    id: {type: String, unique: true},  
    message: {type: String},
    secretAnswer: {type: String},
    timeElapsed: {type: Number},
    maxTime: {type: Number},
    hidden: {type: Boolean},
    // comments: [{
    //     id: {type: String, unique: true}, //should be same as the id of the person who posted the comment
    //     commentAns: {type: String}
    // }]
  //Check out - https://mongoosejs.com/docs/guide.html
},{
    timestamps: true,
});

module.exports =  mongoose.model('postObj', postObjSchema);