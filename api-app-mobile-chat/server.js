'use strict';
const createError = require('http-errors');
const helmet = require('helmet');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
require('dotenv').config();

//SETUP ____________________________________________________________________ SETUP

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(logger('dev'));
//app.use(cookieParser());

//const hostname = '127.0.0.1';
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, /*hostname,*/ () => {
    //console.log(`Server running at http://${hostname}:${port}/...`);
    console.log(`Server running on port :${port}...`);
});
server.on('error', onError);

//SOCKET __________________________________________________________________ SOCKET

global.sockets = [];
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});
require('./socket')(io);

//ROUTES __________________________________________________________________ ROUTES

/*
app.use((req, res, next) => {
    const sessionID = req.headers['x-session-id'];
    req.socket = io.sockets.sockets[sessionID];
    console.log(req.socket);
    next();
});
*/

//INDEX
app.use('/', require('./routers/index.router'));
//USER
app.use('/user', require('./routers/user.router'));
//MessageSalon
app.use('/messagesalon', require('./routers/messageSalon.router'));
//MessageUser
app.use('/messageuser', require('./routers/messageUser.router'));
//AdminRoute
app.use('/admin', require('./middlewares/UserMiddlewares').isAdmin, require('./routers/admin.router'));

//VIEWS ____________________________________________________________________ VIEWS
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
*/
// ERRORS __________________________________________________________________ ERRORS

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    var error = {
        status: err.status,
        message: err.message
    }
    res.status(err.status || 500);
    res.send(error);
});

//FUNCTIONS _______________________________________________________________ FUNCTIONS

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/*
app.use(function(req, res, next) {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
    res.set("Pragma", "no-cache")
    res.set("Expires", 0)
    next()
})
*/