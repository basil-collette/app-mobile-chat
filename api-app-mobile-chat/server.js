'use strict';
const helmet = require('helmet');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const SocketHelper = require('./helpers/SocketHelper');
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

const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET"]
    }
});
global.io = io;
global.clientSockets = [];
require('./socket')();

let disconnectedSocketRemoverInterval = setInterval(() => {
    SocketHelper.removeDisconnectedSockets();
}, 1000);

//ROUTES __________________________________________________________________ ROUTES

//USER
app.use('/user', require('./routers/user.router'));
//MessageSalon
app.use('/messagesalon', require('./routers/messageSalon.router'));
//MessageUser
app.use('/messageuser', require('./routers/messageUser.router'));
//AdminRoute
app.use('/admin', require('./middlewares/UserMiddlewares').isAdmin, require('./routers/admin.router'));

// ERRORS __________________________________________________________________ ERRORS

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }

    let error = {
        status: err.status,
        message: err.message
    }
    res.status(err.status || 500).send(error);
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
    console.error('error function : ');
    console.error(error);
    
    throw new Error('test error');

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