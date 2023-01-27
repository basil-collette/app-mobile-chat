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
    return (socketItem) ? socketItem.socket : null;
}

const removeDisconnectedSockets = () => {
    global.clientSockets = global.clientSockets.filter((item) => {
        return item.socket.connected;
    })
}

//EMIT ___________________________________________________________________________________________ EMIT

const emitUserMsg = (idUserSender, idUserReceiver, msg) => {
    const userSenderSocket = getSocketByIdUser(idUserSender);
    if (userSenderSocket) global.io.to(userSenderSocket.id).emit('new_chatmsg_to_client', msg);

    const userReceiverSocket = getSocketByIdUser(idUserReceiver);
    if (userReceiverSocket) global.io.to(userReceiverSocket.id).emit('new_chatmsg_to_client', msg);
}

const emitRoomMsg = (idSalon, msg) => {
    global.io.in(idSalon).emit('new_chatmsg_to_client', msg);
}

module.exports = {
    associateUserToSocket,
    getSocketByIdUser,
    removeDisconnectedSockets,
    emitUserMsg,
    emitRoomMsg,
};