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
        global.clientSockets.push({socket: socket});
        console.log(`New connection : ${socketId}`);
        //socket.client.conn.remoteAdress
    
        /**
         * triggered when client stop connexion
         */
        socket.on('disconnect', () => {
            console.log(`${socketId} disconnected`);

            global.clientSockets.map((socketItem, index) => {
                if (socketItem.socketId == socketId) {
                    delete global.clientSockets[index];
                    return null;
                }
            });
        });
    
        /**
         * Setup the user id associated to the socket connexion
         */
        socket.on('associate_userid_to_socket', (idUser) => {
            socket.data.idUser = idUser;

            global.clientSockets.map((socketItem, index) => {
                if (socketItem.socket.id == socketId) {
                    global.clientSockets[index].idUser = idUser;
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
            console.log(global.clientSockets);
        });
    
    })
}