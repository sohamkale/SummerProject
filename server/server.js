const express = require('./config/express.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

// Use env port or default
const port = process.env.PORT || 5000;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})

const app = express.init()
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', (err) =>{
    io.emit('message', "Hell0");
    console.log('a user is connected');
   })

http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
