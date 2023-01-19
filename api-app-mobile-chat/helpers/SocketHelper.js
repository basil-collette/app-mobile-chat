/**
 * 
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
    return global.clientSockets.find((socketItem) => socketItem.idUser == idUser);
}

const removeDisconnectedSocket = () => {
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
    if (userSenderSocket) global.io.to(userSenderSocket.socket.id).emit('client_chat', msg);

    const userReceiverSocket = getSocketByIdUser(idUserReceiver);
    if (userReceiverSocket) global.io.to(userReceiverSocket.socket.id).emit('client_chat', msg);
}

module.exports = {
    associateUserToSocket,
    getSocketByIdUser,
    emitUserMsg,
    removeDisconnectedSocket
};