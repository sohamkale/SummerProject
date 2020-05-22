const router = require('express').Router();
let PostModel = require('../models/post.model');

const postsController = {
all(req, res) {
    console.log("In Server side before getting posts: ");
    console.log();
    PostModel.find().then(posts => res.json(posts)).catch(err => res.status('400').json('Error: ' + err));
},

add(req, res) {
    //parse the body from front end-
    req.body = objectify(req.body);
    //Custom Body
    const postObjId = req.body.postObjId;
    const type = req.body.type;
    const numLikes = Number(req.body.numLikes);
    const emojiArray = req.body.emojiArray;
    const secretAnswer = req.body.secretAnswer;
    const timeElapsed = req.body.timeElapsed;
    const maxTime = Number(req.body.maxTime);
    const hidden = req.body.hidden;
    const comments = req.body.comments
    
    const newPost = new PostModel({
        'postObjId': postObjId,
        'type': type,
        'numLikes': numLikes,
        'message': {
            'emojiArray': emojiArray
        },
        'secretAnswer': secretAnswer,
        'timeElapsed': timeElapsed,
        'maxTime': maxTime,
        'hidden': hidden
        //need to add comments Array here
    })
    
    newPost.save().then(() => res.json('post Added!')).catch(err => res.status('400').json('Error: ' + err));
},

test(req,res)
{
    req.body=objectify(req.body)
    console.log(req.body.type)
    res.json('jjs')
    
}
}

function objectify(formArray) {//serialize data function
 
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

module.exports = postsController;
