//const { fetchMovies } = require('../controllers/movie.controller');

module.exports = (io) => {

    io.on('connection', (socket) => {
        let id = socket.id;

        console.log(`New connection : ${id}`);

        socket.on('disconnect', () => console.log(`${id} disconnected`));

        socket.on('message', (message) => {
            //console.log(`${id} : ${message}`);
            io.emit('message', `${id} : ${message}`);
        });

        //socket.on('fetchMovies', () => fetchMovies(socket));

    })
}