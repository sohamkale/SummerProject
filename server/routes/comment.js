const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
    Comment.find().then(comments => res.json(comments)).catch(err => res.status('400').json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const commentId = req.body.commentId;
    const commentAns = req.body.commentAns;
    const numLikes = Number(req.body.numLikes);
    const score = Number(req.body.score);
 
    const newComment = new Comment({
        'commentId': commentId,
        'commentAns': commentAns,
        'numLikes': numLikes,
        'score': score
    })
    
    newComment.save().then(() => res.json('Comment Added!')).catch(err => res.status('400').json('Error: ' + err));
})

module.exports = router;
