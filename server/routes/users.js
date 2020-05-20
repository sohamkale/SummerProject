const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find().then(users => res.json(users)).catch(err => res.status('400').json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const currLevel = Number(req.body.currLevel);
    const friendsList = req.body.friends;
 
    const newUser = new User({
        'id': id,
        'name': name,
        'email': email,
        'currLevel': currLevel,
        'friends': friendsList
    })
    
    newUser.save().then(() => res.json('User Added!')).catch(err => res.status('400').json('Error: ' + err));
})

module.exports = router;
