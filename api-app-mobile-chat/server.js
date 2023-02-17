'use strict';
const helmet = require('helmet');
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const SocketHelper = require('./helpers/SocketHelper');
const cors = require('cors');
require('dotenv').config();

//SETUP ____________________________________________________________________ SETUP

const app = express();

const corsOption = {
    origin : "*"
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));

//const hostname = '127.0.0.1';
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, /*hostname,*/ () => {
    //console.log(`Server running at http://${hostname}:${port}/...`);
    console.log(`Server running on port :${port}...`);
});

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
//Salon
app.use('/salon', require('./routers/salon.router'));
//MessageSalon
app.use('/messagesalon', require('./routers/messageSalon.router'));
//MessageUser
app.use('/messageuser', require('./routers/messageUser.router'));
//AdminRoute
app.use('/admin', require('./middlewares/UserMiddlewares').isAdmin, require('./routers/admin.router'));
//FilterRoute
app.use('/translate', require('./routers/filter.router'));

// ERRORS __________________________________________________________________ ERRORS

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }

    console.log('error need to be handled');

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