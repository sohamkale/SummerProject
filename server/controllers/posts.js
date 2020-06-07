//LEFT BY MOHAMMAD FOR SOHAM TO FINISH//

const router = require('express').Router();
let PostModel = require('../models/post.model');
let UserModel = require('../models/user.model');
const mongoose = require('mongoose');
const express = require('../config/express');
const postsController = {
    all(req, res) {
        let currDateTime = new Date();
        var validPosts = [];
        //how many days do you want the post to expire by?
        var expireDays = 3;
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

    allbyid(req, res) {
        let currDateTime = new Date();
        var validPosts = [];
        //how many days do you want the post to expire by?
        /*     var expireDays =3 ;
             var three_day = 1000 * 60 * 60 * 24* expireDays;*/

        PostModel.find({'userId': req.params.id}).sort({createdAt: -1}).then(
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

    add(req, res) {
        //parse the body from front end-
        req.body = objectify(req.body);

        //Custom Body
        const userId = req.body.userId;
        const name = req.body.username;
        const type = req.body.type;
        // const numLikes = Number(0);

        //this is an array of positions. 
        const emojiArray = req.body.emojiArray;
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
                'emojiArray': emojiArray
            },
            'secretAnswer': secretAnswer,
            'revealsAt': revealsAt,
            'expiresAt': expiresAt,
            'comments': [] //{type: String}
            //need to add comments Array here
        })
        newPost.save().then(() => {
            UserModel.findOneAndUpdate({"userId": userId}, {$push: {posts: newPost._id.toString()}}, (err, data) => {
                if (err) {
                    res.status('404').json({error: 'No data with the specified id was found!'});
                } else {
                    console.log('POST adding done');
                    res.json(newPost);
                    // res.json("Score updated and comment added");
                } 
            });
            
        }).catch(err => res.status('400').json('Error: ' + err));
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

        UserModel.find({"userId": userId}).then(data => {
            totScore = data[0].totScore;
            console.log("totScore: " + totScore);

            //NEED TO CHECK IF THE STRING MATCHES WITH THE SECRET ANSWER TO DETERMINE THE SCORE

            PostModel.find({"_id": req.params.id}, (err, data) => {

                var secret = data[0].secretAnswer.toLowerCase();
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
                    if (data[0]) {
                        for (var i = 0; i < data[0].comments.length; i++) {
                            if (data[0].comments[i].userId === userId) {
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
                                //res.json(data);
                            }
                        });

                        UserModel.findOneAndUpdate({"userId": userId}, {$set: {totScore: result}, $push: {comments: _id.toString()}}, (err, data) => {
                            if (err) {
                                console.log('3')
                                res.status('404');
                                res.json({error: 'No data with the specified id was found!'});
                            } else {
                                console.log('jjjj done')
                                res.json("Score updated and comment added");
                            }
                        });
                    } else if (!shouldAddComment) {
                        console.log('4')
                        res.json({error: 'Error: One user can post only one comment per emortion!!!'})
                    }
                }
            });
        }).catch(err => {res.status('400').json('Error: ' + err)
        console.log('err '+err.message)});
    },

    didUserAnswer(req, res) {
        //req.body._id will contain the id of the post in question.
        //req.params.userId is the userId
        var userAnswered = false;

        PostModel.find({"_id": req.body._id}).then(data => {
            if (data[0].comments) {
                data[0].comments.map((comment => {
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

        PostModel.find({"_id": req.body._id}).then((data) => {
            if (data[0]) {
                if (data[0].likes.includes(req.params.userId)) {
                    PostModel.findOneAndUpdate({"_id": req.body._id}, {$pull: {likes: req.params.userId}}, null, (err, data) => {
                        if (err) {
                            res.status('404');
                            res.json({error: err});
                        } else {
                            console.log(data);
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
                            console.log(data);
                            res.status('200');
                            res.json(data);
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
            }
        });

    },

    likeComment(req, res) {
        //req.body._id will contain the unique id of the comment in question.
        //req.params.userId is the userId
        var shouldUpdate = false;
        PostModel.find({"_id": req.body.post_id}).then(function (data) {
            if (data[0].comments) {
                console.log("Inside data[0].comments");
                for (var i = 0; i < data[0].comments.length; i++) {
                    if (data[0].comments[i]._id == req.body.comment_id) {
                        if (data[0].comments[i].likes.includes(req.params.userId)) {
                            break;
                        } else {
                            shouldUpdate = true;
                            data[0].comments[i].likes.push(req.params.userId);
                            break;
                        }
                    }
                }
                if (shouldUpdate) {
                    PostModel.findOneAndUpdate({"_id": req.body.post_id}, {$set: {comments: data[0].comments}}, (err, data) => {
                        if (err) {
                            res.status('404');
                            res.json({error: "err"});
                        } else {
                            console.log(data);
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

        PostModel.find({"_id": req.body.post_id}).then(function (data) {
            if (data[0].comments) {
                console.log("Inside data[0].comments");
                for (var i = 0; i < data[0].comments.length; i++) {
                    if (data[0].comments[i]._id == req.body.comment_id) {
                        var filteredAry = data[0].comments[i].likes.filter(function (e) {
                            return e !== req.params.userId
                        })
                        data[0].comments[i].likes = filteredAry;
                        break;
                    }
                }
                PostModel.findOneAndUpdate({"_id": req.body.post_id}, {$set: {comments: data[0].comments}}, (err, data) => {
                    if (err) {
                        res.status('404');
                        res.json({error: "err"});
                    } else {
                        console.log(data);
                        res.status('200');
                        res.json(data);
                    }
                });
            } else {
                res.json('404: POST NOT FOUND');
            }
        })

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
