const express = require('./config/express.js');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const api = require('./routes/api');
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
io.on('connection', (socket) =>{
    socket.on('join', (str) => {
        console.log("ASDFDS");
        console.log(str);
    })
    io.emit('message', "Hell0");
    console.log('a user is connected in server');
})
app.use('/api', api);
http.listen(port, () => console.log(`Server now running on port ${port}!`)); //app.listen
