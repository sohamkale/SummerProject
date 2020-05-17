const express = require('./config/express.js');
const mongoose = require('mongoose');
 
// Use env port or default
const port = process.env.PORT || 5000;

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
})
// require('./models/post.model');
// require('./models/user.model');
const usersRouter = require('./routes/users');

const app = express.init()
app.use('/users', usersRouter);
app.listen(port, () => console.log(`Server now running on port ${port}!`));
