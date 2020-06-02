//LEFT BY MOHAMMAD FOR SOHAM TO FINISH//

const router = require('express').Router();
let PostModel = require('../models/post.model');
const mongoose = require('mongoose')
const postsController = {
    all(req, res) {
        console.log("In Server side before getting posts: ");
        console.log();
        PostModel.find().sort({ createdAt: -1 }).then(posts => res.json(posts)).catch(err => res.status('400').json('Error: ' + err));
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
        let currHours = currDateTime.getHours();
        if(validity === '1h'){
            currDateTime.setHours(currHours + Number(1));
        }else if(validity === '2h'){
            currDateTime.setHours(currHours + Number(2));
        }else if(validity === '3h'){
            currDateTime.setHours(currHours + Number(3));
        }
        let expiresAt = currDateTime;

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
        req.body = objectify(req.body);
        const answer = req.body.answer;
        const userId = req.body.userId;
        const _id = new mongoose.Types.ObjectId();
        const name = req.body.name;
        let numLikes, score;
        if(req.body.numLikes != null  || req.body.numLikes != ""){
            numLikes = req.body.numLikes;
        }else {
            numLikes = 0;
        }
        
        // if(req.body.score != null || req.body.score != ""){
        //     score = req.body.score;
        // }else {
        //     score = 0;
        // }
        score=0;
        PostModel.find({"_id": req.params.id}).then(data => {
            var secret = data[0].secretAnswer;
            //Do regex here//
            var secWords = secret.split(' ');
            console.log(secWords)
        }).catch(err => res.status('400').json('Error: ' + err));  
        
        //NEED TO CHECK IF THE STRING MATCHES WITH THE SECRET ANSWER TO DETERMINE THE SCORE

        PostModel.findOneAndUpdate({ "_id": req.params.id }, { $push: {comments: {_id: _id, answer: answer, userId: userId, numLikes: numLikes, score: score, name: name}} },{new: true}, (err, data) => {
            if (err) {
                res.status('404');
                res.json({ error: 'No data with the specified id was found!' });
            } else {            
                res.json(data);
            }
        });
        
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
