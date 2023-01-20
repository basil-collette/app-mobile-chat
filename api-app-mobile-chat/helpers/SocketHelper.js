/**
 * Module manipulate sockets
 */

//SETUP _________________________________________________________________________________________ SETUP

const associateUserToSocket = (socketId, idUser) => {
    global.clientSockets.map((socketItem, index) => {
        if (socketItem.socket.id == socketId) {
            global.clientSockets[index].idUser = idUser;
            return;
        }
    });
}

const getSocketByIdUser = (idUser) => {
    const socketItem = global.clientSockets.find((socketItem) => socketItem.idUser == idUser);
    return socketItem.socket;
}

const removeDisconnectedSockets = () => {
    global.clientSockets.map((socketItem, index) => {
        if (!socketItem.socket.connected) {
            global.clientSockets = global.clientSockets.splice(index, 1);
            return null;
        }
    });
}

//EMIT ___________________________________________________________________________________________ EMIT

const emitUserMsg = (idUserSender, idUserReceiver, msg) => {
    const userSenderSocket = getSocketByIdUser(idUserSender);
    if (userSenderSocket) global.io.to(userSenderSocket.socket.id).emit('new_chatmsg_to_client', msg);

    const userReceiverSocket = getSocketByIdUser(idUserReceiver);
    if (userReceiverSocket) global.io.to(userReceiverSocket.socket.id).emit('new_chatmsg_to_client', msg);
}

module.exports = {
    associateUserToSocket,
    getSocketByIdUser,
    emitUserMsg,
    removeDisconnectedSockets
};