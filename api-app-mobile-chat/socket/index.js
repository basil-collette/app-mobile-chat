module.exports = (io) => {

    io.on('connection', (socket) => {
        let id = socket.id;

        console.log(`New connection : ${id}`);

        socket.on('disconnect', () => console.log(`${id} disconnected`));

        socket.on('chat', (message) => {
            console.log(`${id} : ${message}`);
            io.emit('chat', `${id} : ${message}`);
        });
    })
}