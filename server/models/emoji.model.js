const mongoose = require('mongoose');

const emojiSchema = new mongoose.Schema ({
    x: {type: String},
    y: {type: String}
})


module.exports =  mongoose.model('emoji', emojiSchema);