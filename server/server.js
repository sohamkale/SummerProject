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
    
        //console.log('a user is connected in server');
    socket.on('join', ({currUser, room, currUserUid}) => {
        console.log('a user is connected in server ' + currUser);
        socket.join(room);
         io.in(commonRoom).clients((err , clients) => {
                clients.map((client) => {
                    console.log(client);
                    //io.to(client).emit('notification', { message: "You have a notification" });// clients will be array of socket ids , currently available in given room
    
                })
            });
        // socket.join(currUserUid);
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
            io.to(commonRoom).emit('message', { posts: array });
            // io.in(commonRoom).clients((err , clients) => {
            //     clients.map((client) => {
            //         console.log(client);
            //         io.to(client).emit('notification', { message: "You have a notification" });// clients will be array of socket ids , currently available in given room
    
            //     })
            // });
        } ).catch(err => console.log(err.message));

    });
    
    socket.on('addPosts', ({currUser,userId,OnePost}, callback) => {
        let array = [];
        let currDateTime = new Date();
        if(OnePost)
        {
            PostModel.find({'_id':userId}).sort({ createdAt: -1 }).then(function(posts) {
                // array = posts;
                posts.map((post) => {
                    if(new Date() - post.createdAt < three_day){
                        array.push(post);
                    }
                })
                io.to(commonRoom).emit('message', { user: currUser, posts: array });
                io.in(commonRoom).clients((err , clients) => {
                    clients.map((client) => {
                        console.log(client);
                        io.to(client).emit('notification', { message: "You have a notification" });// clients will be array of socket ids , currently available in given room
        
                    })
                });
            } )
        }
        else if(userId)
        {
            PostModel.find({'userId':userId}).sort({ createdAt: -1 }).then(function(posts) {
                // array = posts;
                posts.map((post) => {
                    if(new Date() - post.createdAt < three_day){
                        array.push(post);
                    }
                })
                io.to(commonRoom).emit('message', { user: currUser, posts: array });
                io.in(commonRoom).clients((err , clients) => {
                    clients.map((client) => {
                        console.log(client);
                        io.to(client).emit('notification', { message: "You have a notification" });// clients will be array of socket ids , currently available in given room
        
                    })
                });
            } )
        }
        else{
            PostModel.find({}).sort({ createdAt: -1 }).then(function(posts) {
                // array = posts;
                posts.map((post) => {
                    if(new Date() - post.createdAt < three_day){
                        array.push(post);
                    }
                })
                io.to(commonRoom).emit('message', { user: currUser, posts: array });
                io.in(commonRoom).clients((err , clients) => {
                    clients.map((client) => {
                        console.log(client);
                        io.to(client).emit('notification', { message: "You have a notification" });// clients will be array of socket ids , currently available in given room
        
                    })
                });
            } )
        }

    })
})


http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
