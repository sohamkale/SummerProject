const router = require('express').Router();
let PostModel = require('../models/post.model');

router.route('/').get((req, res) => {
    PostModel.find().then(posts => res.json(posts)).catch(err => res.status('400').json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const message = req.body.message;
    const secretAnswer = req.body.secretAnswer;
    const timeElapsed = req.body.timeElapsed;
    const maxTime = Number(req.body.maxTime);
    const hidden = req.body.hidden;
    const comments = req.body.comments
    
    const newPost = new PostModel({
        'id': id,
        'message': message,
        'secretAnswer': secretAnswer,
        'timeElapsed': timeElapsed,
        'maxTime': maxTime,
        'hidden': hidden,

    })
    
    newPost.save().then(() => res.json('post Added!')).catch(err => res.status('400').json('Error: ' + err));
})

module.exports = router;
