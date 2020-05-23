//LEFT BY MOHAMMAD FOR SOHAM TO FINISH//

const router = require('express').Router();
let PostModel = require('../models/post.model');
const mongoose = require('mongoose')
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
        const postObjId = req.body.userId;
        const type = req.body.type;
        const numLikes = Number(0);

        //this is an array of positions. 
        const emojiArray = req.body.emojiArray;
        const secretAnswer = req.body.secretAnswer;

        //Calculate expire time from req.body.validity
        const validity = req.body.validity; 
        let currDateTime = new Date();
        console.log(currDateTime);
        let currHours = currDateTime.getHours();
        console.log("Hours: " + currHours);
        if(validity === '1h'){
            currDateTime.setHours(currHours + Number(1));
        }else if(validity === '2h'){
            currDateTime.setHours(currHours + Number(2));
        }else if(validity === '3h'){
            currDateTime.setHours(currHours + Number(3));
        }
        let expiresAt = currDateTime;
        console.log("Expires at: " + expiresAt);

        // should be empty to start 
        // const comments = req.body.comments

        const newPost = new PostModel({
            'postObjId': postObjId,
            'type': type,
            'numLikes': numLikes,
            'message': {
                'emojiArray': emojiArray
            },
            'secretAnswer': secretAnswer,
            'expiresAt': expiresAt,
            'comments': [] //{type: String}
            //need to add comments Array here
        })
        newPost.save().then(() => res.json(newPost)).catch(err => res.status('400').json('Error: ' + err));
    },

    addComments(req, res) {
        const answer = req.body.answer;
        const userId = req.body.userId;
        const _id = new mongoose.Types.ObjectId();
        const numLikes = req.body.numLikes;
        const score = req.body.score;
        //NEED TO CHECK IF THE STRING MATCHES WITH THE SECRET ANSWER TO DETERMINE THE SCORE

        PostModel.findOneAndUpdate({ "postObjId": req.params.id }, { $push: {comments: {_id: _id, answer: answer, userId: userId, numLikes: numLikes, score: score}} },{new: true}, (err, data) => {
            if (err) {
                console.log("ERROR")
                res.status('404');
                res.json({ error: 'No data with the specified id was found!' });
            } else {           
                console.log(data); 
                res.json(data);
            }
        });
        // PostModel.find({"postObjId": req.params.id}).then(users => res.json(users[0].name)).catch(err => res.status('400').json('Error: ' + err));  
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
