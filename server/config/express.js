const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    exampleRouter = require('../routes/examples.server.routes');

    const cors = require('cors');
    const api = require('../routes/api');
    
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
    // app.use('/api/example', exampleRouter);
    app.use('/api', api);
    // var http = require('http').Server(app);
    // var io = require('socket.io')(http);
    // io.on('connection', (err) =>{
    //     io.emit('message', "Hell0");
    //     console.log('a user is connected');
    // })

    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
        if (req.method == 'OPTIONS') {
        res.status(200).end();
        } else {
        next();
        }
    });

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }
    return app
}

