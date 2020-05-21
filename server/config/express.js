const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    exampleRouter = require('../routes/examples.server.routes');
    const cors = require('cors');
    
    
module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    require('dotenv').config();
    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(cors());
    app.use(bodyParser.json());

    // add a router
    app.use('/api/example', exampleRouter);

    if (process.env.NODE_ENV === "production"){
        console.log("in production");
        app.use(express.static("../../client/build"));
    }else {
        console.log("not in production");
    }
    return app
}

