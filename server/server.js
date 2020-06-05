const express = require('./config/express.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');
require('dotenv').config();
let PostModel = require("./models/post.model");
let User = require('./models/user.model');
const commonRoom = "commonRoom";

var expireDays =3 ;
var three_day = 1000 * 60 * 60 * 24* expireDays;
// Use env port or default
const port = process.env.PORT || 5000;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})

const app = express.init()
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', (socket) =>{
    // io.emit('message', "Hell0");
    
        console.log('a user is connected in server');
    socket.on('join', ({currUser, room}) => {
        socket.join(room);
        socket.emit('joinedRoom', { user: 'admin', text: `${currUser}, welcome to room ${room}.`});
        socket.broadcast.to(room).emit('joinedRoom', { user: 'admin', text: `${currUser} has joined!` });
        // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) }); //not required
        console.log(currUser);
    }) 
    
    socket.on('addComment', (id, callback) => {
        let array = [];
        let currDateTime = new Date();
        var id = require('mongoose').Types.ObjectId(id);
        PostModel.find({}).sort({ createdAt: -1 }).then(function(posts) {
            // array = posts;
            posts.map((post) => {
                if(new Date() - post.createdAt < three_day){
                    array.push(post);
                }
            })
            io.to(commonRoom).emit('message', { posts: array })
        } ).catch(err => console.log(err.message));

    });
    
    socket.on('addPosts', ({currUser,postId}, callback) => {
        let array = [];
        let currDateTime = new Date();
        PostModel.find({}).sort({ createdAt: -1 }).then(function(posts) {
            // array = posts;
            posts.map((post) => {
                if(new Date() - post.createdAt < three_day){
                    array.push(post);
                }
            })
            io.to(commonRoom).emit('message', { user: currUser, posts: array })
        } )
    })
})


http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
