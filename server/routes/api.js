const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')
const usersController = require('../controllers/users')
const feedbackController = require('../controllers/feedback')
const notificationController = require('../controllers/notifications')


router.get('/users', usersController.all);
router.post('/users/add', usersController.add);
router.get('/users/:id', usersController.find);
router.post('/users/addProfileImage/:userId', usersController.addProfileImage);

router.post('/feedback',feedbackController.add);

router.get('/posts', postsController.all);
router.get('/sortedposts', postsController.Sortedall);
router.get('/posts/:_id', postsController.getPost);
router.get('/postsByUser/:userId', postsController.allPostsByUserId);

router.post('/posts/add', postsController.add);
router.post('/posts/answer/:id', postsController.addComments);
router.post('/posts/diduseranswer/:userId', postsController.didUserAnswer);
router.post('/posts/like/:userId', postsController.likePosts);
router.post('/posts/dislike/:userId', postsController.dislikePosts);
router.post('/posts/likeComment/:userId', postsController.likeComment);
router.post('/posts/dislikeComment/:userId', postsController.dislikeComment);

router.post('/notifications', notificationController.add);
router.get('/notifications/:id', notificationController.all);
router.post('/notifications/:_id', notificationController.seen);

router.get('/posts/comments/:_id', postsController.getComment);
router.get('/posts/commentsByUser/:_id', postsController.getCommentByUser);

module.exports = router;