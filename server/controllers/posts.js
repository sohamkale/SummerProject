//LEFT BY MOHAMMAD FOR SOHAM TO FINISH//

const router = require('express').Router();
let PostModel = require('../models/post.model');
let UserModel = require('../models/user.model');
let NotificationModel = require('../models/notification.model');

const mongoose = require('mongoose');
const express = require('../config/express');
const postsController = {
    all(req, res) {
        let currDateTime = new Date();
        var validPosts = [];
        //how many days do you want the post to expire by?
        var expireDays = 10;
        var three_day = 1000 * 60 * 60 * 24 * expireDays;

        console.log("In Server side before getting posts: ");
        console.log();
        PostModel.find().sort({createdAt: -1}).then(
            posts => {
                posts.map((post) => {
                    if (new Date() - post.createdAt < three_day) {
                        validPosts.push(post);
                    }
                })
                res.json(validPosts)
            }
        ).catch(err => res.status('400').json('Error: ' + err));
    },

    Sortedall(req, res) {
        let currDateTime = new Date();
        var validPosts = [];
        //how many days do you want the post to expire by?
        var expireDays = 3;
        var three_day = 1000 * 60 * 60 * 24 * expireDays;

        console.log("In Server side before getting posts: ");
        console.log();
        PostModel.find().sort({userId:1,createdAt:-1}).then(
            posts => {
                posts.map((post) => {
                    if (new Date() - post.createdAt < three_day) {
                        validPosts.push(post);
                    }
                })
                res.json(validPosts)
            }
        ).catch(err => res.status('400').json('Error: ' + err));
    },

    allPostsByUserId(req, res) {
        let currDateTime = new Date();
        var validPosts = [];
        //how many days do you want the post to expire by?
        /*     var expireDays =3 ;
             var three_day = 1000 * 60 * 60 * 24* expireDays;*/

        PostModel.find({'userId': req.params.userId}).sort({createdAt: -1}).then(
            posts => {
                console.log(posts)
                posts.map((post) => {
                    /*  if(new Date() - post.createdAt < three_day){

                      }*/

                    validPosts.push(post);
                })
                res.json(validPosts)
            }
        ).catch(err => res.status('400').json('Error: ' + err));
    },

    getPost(req, res) {
        PostModel.find({'_id': req.params._id}).sort({createdAt: -1}).then(
            posts => {
                res.json(posts);
            }
        ).catch(err => res.status('400').json('Error: ' + err));
    },

    add(req, res) {
        //parse the body from front end-
        //req.body = objectify(req.body);
        //Custom Body
        const userId = req.body.userId;
        const name = req.body.username;
        const type = req.body.type;
        // const numLikes = Number(0);

        //this is an array of positions. 
        const emojiArray = null;
        const emojiObjects = req.body.emojiObjects;
        const secretAnswer = req.body.secretAnswer;

        //Calculate expire time from req.body.validity
        const validity = req.body.validity;
        let currDateTime = new Date();
        let expiryDateTime = new Date();
        let currHours = currDateTime.getHours();
        let expiryHours = expiryDateTime.getHours();
        if (validity === '1h') {
            currDateTime.setHours(currHours + Number(1));
        } else if (validity === '2h') {
            currDateTime.setHours(currHours + Number(2));
        } else if (validity === '3h') {
            currDateTime.setHours(currHours + Number(3));
        }
        expiryDateTime.setHours(expiryHours + Number(72));
        let revealsAt = currDateTime;
        let expiresAt = expiryDateTime;

        // should be empty to start 
        // const comments = req.body.comments

        const newPost = new PostModel({
            'userId': userId,
            'type': type,
            'likes': [],
            'name': name,
            'message': {
                'emojiArray': emojiArray,
                'emojiObjects': emojiObjects
            },
            'secretAnswer': secretAnswer,
            'revealsAt': revealsAt,
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
        var score = 0, totScore = 0;
        var shouldAddComment = true;
        if (req.body.numLikes != null || req.body.numLikes != "") {
            numLikes = req.body.numLikes;
        } else {
            numLikes = 0;
        }

        if (req.body.score != null || req.body.score != "") {
            score = req.body.score;
        } else {
            score = 1; //1 point for posting the comment
        }

        var removePronouns = /I |you |he |she |it |they |me |you |him |her |it |my |mine |your |yours |his |her |hers |its |who |whom |whose |what |which |another |each |everything |nobody |either |someone |who |whom |whose |that |which |myself |yourself |himself |herself |itself |this |that /ig;
        var removeAuxVerbs = /do |does |did |has |have |had |is |am |are |was |were |be |being |been |may |must |might |should |could |would |shall |will |can /ig;
        var ans = answer.toLowerCase();
        var answerWords = ans.split(' ');
        console.log("answerWords: ");
        console.log(answerWords);

        UserModel.findOne({"userId": userId}).then(data => {
            totScore = data.totScore;
            console.log("totScore: " + totScore);

            //NEED TO CHECK IF THE STRING MATCHES WITH THE SECRET ANSWER TO DETERMINE THE SCORE

            PostModel.findOne({"_id": req.params.id}, (err, data) => {

                var secret = data.secretAnswer.toLowerCase();
                //Do regex here//

                var secWords = secret.split(' ');
                console.log("secretWords: ");
                console.log(secWords);
                var count = 0;
                for (var i = 0; i < secWords.length; i++) {
                    if (answerWords.includes(secWords[i])) {
                        count++;
                    }
                }

                score = Number.parseFloat((count / secWords.length) * 10).toFixed(2)
                console.log(score);
                var result = parseFloat(score) + parseFloat(totScore);
                result = result.toFixed(2);
                console.log(result);

                if (err) {
                    console.log('1')
                    res.status('404');
                    res.json({error: err});
                } else {
                    if (data) {
                        for (var i = 0; i < data.comments.length; i++) {
                            if (data.comments[i].userId === userId) {
                                shouldAddComment = false;
                                break;
                            }
                        }
                    }
                    if (shouldAddComment) {
                        PostModel.findOneAndUpdate({"_id": req.params.id}, {
                            $push: {
                                comments: {
                                    _id: _id,
                                    answer: answer,
                                    userId: userId,
                                    likes: [],
                                    score: score,
                                    name: name
                                }
                            }
                        }, {new: true}, (err, data) => {
                            if (err) {
                                console.log('2')
                                res.status('404');
                                res.json({error: 'No data with the specified id was found!'});
                            } else {
                                //send notification to the user!!
                                const newNotif = new NotificationModel(
                                    {
                                        'userId': data.userId,
                                        'postedById': userId,
                                        'postedByName': name,
                                        'seen': false,
                                        'message': name + ' answered your Emortion and scored ' + score,
                                        'postId': data._id,
                                        'commentId': _id,
                                    }
                                );
                                newNotif.save().then(() => console.log('done sending notification')).catch(err => console.log(err));
                                //res.json(data);
                            }
                        });

                        UserModel.findOneAndUpdate({"userId": userId}, {$set: {totScore: result}}, (err, data) => {
                            if (err) {
                                console.log('3')
                                res.status('404');
                                res.json({error: 'No data with the specified id was found!'});
                            } else {

                                res.json("Score updated");
                            }
                        });
                    } else if (!shouldAddComment) {
                        console.log('4')
                        res.json({error: 'Error: One user can post only one comment per emortion!!!'})
                    }
                }
            });
        }).catch(err => {
            res.status('400').json('Error: ' + err)
            console.log('err ' + err.message)
        });
    },

    didUserAnswer(req, res) {
        //req.body._id will contain the id of the post in question.
        //req.params.userId is the userId
        var userAnswered = false;

        PostModel.findOne({"_id": req.body._id}).then(data => {
            if (data.comments) {
                data.comments.map((comment => {
                    if (comment.userId === req.params.userId) {
                        userAnswered = true;
                    }
                }))
                res.json(userAnswered);
            } else {
                res.json('404: POST NOT FOUND');
            }
        })
    },

    likePosts(req, res) {
        //req.body._id will contain the id of the post in question.
        //req.params.userId is the userId

        PostModel.findOne({"_id": req.body._id}).then((data) => {
            if (data) {
                if (data.likes.includes(req.params.userId)) {
                    PostModel.findOneAndUpdate({"_id": req.body._id}, {$pull: {likes: req.params.userId}}, null, (err, data) => {
                        if (err) {
                            res.status('404');
                            res.json({error: err});
                        } else {
                            res.status('200');
                            res.json(data);
                        }
                    });
                } else {
                    PostModel.findOneAndUpdate({"_id": req.body._id}, {$push: {likes: req.params.userId}}, null, (err, data) => {
                        if (err) {
                            res.status('404');
                            res.json({error: err});
                        } else {
                            //send notification to the user!!
                            const newNotif = new NotificationModel(
                                {
                                    'userId': data.userId,
                                    'postedById': req.params.id,
                                    'postedByName': req.body.name,
                                    'seen': false,
                                    'message': req.body.name + ' liked your post',
                                    'postId': data._id,
                                    //'commentId': _id,
                                }
                            );
                            newNotif.save().then(() => console.log('done sending notification')).catch(err => console.log(err));
                            res.status('200');
                            res.json(data);

                            UserModel.findOne({"userId": data.userId}, (err, data) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    let userScore = data.totScore;
                                    userScore = userScore + 1;
                                    UserModel.findOneAndUpdate({"userId": data.userId}, {totScore: userScore.toFixed(2)}, null, (err, data)=>{
                                        if(err) {
                                            console.log(err);
                                        }
                                    })
                                }
                            
                            })
                        }
                    });
                }
            } else {
                res.json('404: POST NOT FOUND');
            }
        })

    },

    dislikePosts(req, res) {
        //req.body._id will contain the id of the post in question.
        //req.params.userId is the userId

        PostModel.findOneAndUpdate({"_id": req.body._id}, {$pull: {likes: req.params.userId}}, null, (err, data) => {
            if (err) {
                res.status('404');
                res.json({error: err});
            } else {
                console.log(data);
                res.status('200');
                res.json(data);

                UserModel.findOne({"userId": data.userId}, (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        let userScore = data.totScore;
                        userScore = userScore - 1;
                        UserModel.findOneAndUpdate({"userId": data.userId}, {totScore: userScore.toFixed(2)}, null, (err, data)=>{
                            if(err) {
                                console.log(err);
                            }
                        })
                    }
                
                })
            }
        });

    },

    likeComment(req, res) {
        //req.body._id will contain the unique id of the comment in question.
        //req.params.userId is the userId
        var shouldUpdate = false;
        var commentIndex=-1;
        let userUID;
        PostModel.findOne({"_id": req.body.post_id}).then(function (data) {
            if (data.comments) {
                for (var i = 0; i < data.comments.length; i++) {
                    if (data.comments[i]._id == req.body.comment_id) {
                        commentIndex=i;
                        userUID = data.comments[i].userId;
                        if (data.comments[i].likes.includes(req.params.userId)) {
                            break;
                        } else {
                            shouldUpdate = true;
                            data.comments[i].likes.push(req.params.userId);
                            //send notification to the user!!
                            console.log(data)
                            const newNotif = new NotificationModel(
                                {
                                    'userId': data.comments[commentIndex].userId,
                                    'postedById': req.params.id,
                                    'postedByName': req.body.name,
                                    'seen': false,
                                    'message': req.body.name + ' liked your Comment.',
                                    'postId': data._id,
                                    'commentId': req.body.comment_id,
                                }
                            );
                            
                            UserModel.findOne({"userId": userUID}, (err, data) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    let userScore = data.totScore;
                                    userScore = userScore + 2;
                                    UserModel.findOneAndUpdate({"userId": userUID}, {totScore: userScore.toFixed(2)}, null, (err, data)=>{
                                        if(err) {
                                            console.log(err);
                                        }
                                    })
                                }
                            
                            })
                            newNotif.save().then(() => console.log('done sending notification')).catch(err => console.log(err));
                            break;
                        }
                    }
                }
                if (shouldUpdate) {
                    PostModel.findOneAndUpdate({"_id": req.body.post_id}, {$set: {comments: data.comments}}, (err, data) => {
                        if (err) {
                            res.status('404');
                            res.json({error: "err"});
                        } else {
                            res.status('200');
                            res.json(data);
                        }
                    });
                } else {
                    res.json(data);
                }
            } else {
                res.json('404: POST NOT FOUND');
            }
        })
    },

    dislikeComment(req, res) {
        //req.body._id will contain the id of the post in question.
        //req.params.userId is the userId

        // PostModel.findOneAndUpdate({"_id": req.body._id},{$pull: {comments: {likes:req.params.userId}}},(err, data) => {
        //     if (err) {
        //         res.status('404');
        //         res.json({ error: "err" });
        //     } else {
        //         console.log(data);
        //         res.status('200');
        //         res.json(data);
        //     }
        // });

        PostModel.findOne({"_id": req.body.post_id}).then(function (data) {
            let userUID;
            if (data.comments) {
                console.log("Inside data[0].comments");
                for (var i = 0; i < data.comments.length; i++) {
                    if (data.comments[i]._id == req.body.comment_id) {
                        var filteredAry = data.comments[i].likes.filter(function (e) {
                            return e !== req.params.userId
                        })
                        userUID = data.comments[i].userId;
                        data.comments[i].likes = filteredAry;
                        break;
                    }
                }
                PostModel.findOneAndUpdate({"_id": req.body.post_id}, {$set: {comments: data.comments}}, (err, data) => {
                    if (err) {
                        res.status('404');
                        res.json({error: "err"});
                    } else {
                        console.log(data);
                        res.status('200');
                        res.json(data);

                        
                        UserModel.findOne({"userId": userUID}, (err, data) => {
                            if(err){
                                console.log(err);
                            }else{
                                let userScore = data.totScore;
                                userScore = userScore - 2;
                                UserModel.findOneAndUpdate({"userId": userUID}, {$set: {totScore: userScore.toFixed(2)}}, null, (err, data)=>{
                                    if(err) {
                                        console.log(err);
                                    }
                                })
                            }
                        })
                    }
                });
            } else {
                res.json('404: POST NOT FOUND');
            }
        })

    },
    getComment(req, res) {
        PostModel.aggregate([
            {$unwind: "$comments"},
            {$match: {"comments._id": new mongoose.Types.ObjectId(req.params._id)}},
            {
                $project: {
                    _id: "$comments._id",
                    answer: "$comments.answer",
                    userId: "$comments.userId",
                    likes: "$comments.likes",
                    score: "$comments.score",
                    name: "$comments.name"
                }
            }
        ], function (err, comment) {
            console.log(comment);
            res.json(comment);
        });
    },

    getCommentByUser(req, res) {
        PostModel.aggregate([
            {$unwind: "$comments"},
            {$match: {"comments.userId": req.params._id}},
            {
                $project: {
                    _id: "$comments._id",
                    answer: "$comments.answer",
                    userId: "$comments.userId",
                    likes: "$comments.likes",
                    score: "$comments.score",
                    name: "$comments.name",
                    postId: "$_id",
                    message: "$message"
                }
            }
        ], function (err, comment) {
            console.log(comment);
            res.json(comment);
        });
    }

}

function objectify(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

module.exports = postsController;
