const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')
const usersController = require('../controllers/users')


router.get('/users', usersController.all);
router.post('/users/add', usersController.add);
router.get('/posts', postsController.all);
router.post('/posts/add', postsController.add);

module.exports = router;