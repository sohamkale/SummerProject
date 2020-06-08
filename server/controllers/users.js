
const router = require('express').Router();
let User = require('../models/user.model');

const usersController = {
    all(req, res) {
    console.log("In Server side before getting: ");
    console.log();
    User.find().then(users => res.json(users)).catch(err => res.status('400').json('Error: ' + err));
},

add(req, res) {
    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;
    const currLevel = Number(req.body.currLevel);
    const friendsList = req.body.friends;
    console.log("In Server side before posting: ");
    console.log(userId + " " + name + " " + email + " " + currLevel + " " + friendsList);
    const newUser = new User({
        'userId': userId,
        'name': name,
        'email': email,
        'currLevel': currLevel,
        'friends': friendsList
            //need to add comments and posts that the user has made that haven't been expired (need to think if its necessary)
    })
    
    newUser.save().then(() => res.json('User Added!')).catch(err => res.status('400').json('Error: ' + err));
},

find(req, res) {
    User.find({"userId": req.params.id}).then(users => res.json(users[0])).catch(err => res.status('400').json('Error: ' + err));
},

addProfileImage(req, res){
    const profileImageUrl = req.body.url;
    console.log(profileImageUrl);

    User.findOneAndUpdate({"userId": req.params.userId}, {profileImage: profileImageUrl.toString()}, (err, data) => {
        if (err) {
            console.log('3')
            res.status('404');
            res.json({error: 'No data with the specified id was found!'});
        } else {
            console.log(data);
            res.json(data);
        }
    });
}
}
module.exports = usersController;