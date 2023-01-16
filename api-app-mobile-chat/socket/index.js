/**
 * Socket Events of the API, declared in server.js
 */
module.exports = (io) => {

    /**
     * Triggered when new connexion is etablished with a client
     * setup all the socket events of this connexion
     */
    io.on('connection', (socket) => {
    
        const socketId = socket.id;
        global.sockets.push({socketId: socketId});
        console.log(`New connection : ${socketId}`);
    
        /**
         * triggered when client stop connexion
         */
        socket.on('disconnect', () => {
            console.log(`${socketId} disconnected`);

            global.sockets.map((socketItem, index) => {
                if (socketItem.socketId == socketId) {
                    delete global.sockets[index];
                    return;
                }
            });
        });
    
        /**
         * Setup the user id associated to the socket connexion
         */
        socket.on('associate_userid_to_socket', (idUser) => {
            socket.data.idUser = idUser;

            global.sockets.map(socketItem => {
                if (socketItem.socketId == socketId) {
                    socketItem.idUser = idUser;
                    return;
                }
            });
        })
    
        // CHAT EVENTS ___________________________________________________________________ CHAT EVENTS
    
        socket.on('join_salon', (idSalon) => {
            //socket.join('chatgeneral');
        });
    
        socket.on('api-chat', (message) => {
            io.emit('client-chat', `${socketId} : ${message}`);
        });

        socket.on('test', (test) => {
            console.log(global.sockets);
        });
    
    })
}