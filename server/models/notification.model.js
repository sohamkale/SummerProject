const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
//type, number of likes, string array of answers - no. likes, no. of points// we dont need these
    userId: {type: String},   //should be unique or not? not unique
    postedById: {type:String},
    postedByName: {type:String},
    seen:{type:Boolean},
    message: {type: String},
    postId: {type: String},
    commentId: {type: String}
    //Check out - https://mongoosejs.com/docs/guide.html
},{
    timestamps: true,
});


module.exports =  mongoose.model('notification', notificationSchema);