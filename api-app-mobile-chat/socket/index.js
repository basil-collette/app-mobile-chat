/**
 * Socket Events of the API, declared in server.js
 */

const SocketHelper = require('../helpers/SocketHelper');

module.exports = () => {

    /**
     * Triggered when new connexion is etablished with a client
     * setup all the socket events of this connexion
     */
    global.io.on('connection', (socket) => {
    
        const socketId = socket.id;
        global.clientSockets.push({socket: socket, idUser: undefined});
        console.log(`New connection : ${socketId}`);
        //socket.client.conn.remoteAdress
    
        /**
         * triggered when client stop connexion
         */
        socket.on('disconnect', () => {
            console.log(`${socketId} disconnected`);
        });
    
        /**
         * Setup the user id associated to the socket connexion
         */
        socket.on('associate_userid_to_socket', (idUser) => {
            //socket.data.idUser = idUser;

            SocketHelper.associateUserToSocket(socketId, idUser);
        })
    
        socket.on('join_room', (idSalon) => {
            socket.join(idSalon);
        });

        socket.on('leave_room', (idSalon) => {
            socket.leave(idSalon);
        });
    
    })
}