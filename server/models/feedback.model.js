const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema ({
   feedback : {type: String},
    //status 0 = new, 1=read -1=discarded 100 =later 2=inprogress 3=completed
   status: {type: Number}
},{
   timestamps: true,
});


module.exports =  mongoose.model('feedback', feedbackSchema);