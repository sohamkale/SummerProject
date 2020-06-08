const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')
const usersController = require('../controllers/users')
const feedbackController = require('../controllers/feedback')
const notificationController = require('../controllers/notifications')


router.get('/users', usersController.all);
router.post('/users/add', usersController.add);
router.get('/users/:id', usersController.find);

router.post('/feedback',feedbackController.add);

router.get('/posts', postsController.all);
router.get('/posts/:id', postsController.allbyid);

router.post('/posts/add', postsController.add);
router.post('/posts/answer/:id', postsController.addComments);
router.post('/posts/diduseranswer/:userId', postsController.didUserAnswer);
router.post('/posts/like/:userId', postsController.likePosts);
router.post('/posts/dislike/:userId', postsController.dislikePosts);
router.post('/posts/likeComment/:userId', postsController.likeComment);
router.post('/posts/dislikeComment/:userId', postsController.dislikeComment);

router.post('/notifications', notificationController.add);
router.get('/notifications/:id', notificationController.all);
router.post('/notifications/:id', notificationController.seen);

module.exports = router;