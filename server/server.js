const express = require('./config/express.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');
require('dotenv').config();
let PostModel = require("./models/post.model");
let User = require('./models/user.model');
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
    // PostModel.find().then(posts => console.log(posts)).catch(err => res.status('400').json('Error: ' + err));
        console.log('a user is connected in server');
    socket.on('join', ({currUser}) => {
        console.log(currUser);
    }) 
})

app.use('/api', api);
http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
