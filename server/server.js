const express = require('./config/express.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');
require('dotenv').config();
let PostModel = require("./models/post.model");
let User = require('./models/user.model');
const commonRoom = "commonRoom";
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
    socket.on('addPosts', ({currUser, str}, callback) => {
        let array = [];
        PostModel.find({}).then(function(posts) {
            //console.log(array);
            array = posts;
            console.log(commonRoom);
            io.to(commonRoom).emit('message', { user: currUser, posts: array })
        } );
         console.log(array);
        //  callback();
        // console.log("ASDSDSADSASDSASDSADSADSDSASDSASDSASDSDSASDSASDSADSDSDSAD");
        
        // console.log(str);
    }) 
})

app.use('/api', api);
http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
