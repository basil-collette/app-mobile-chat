/**
 * Socket Events of the Client react-native
 * @param {*} io socket declared in socket.context.js
 */
module.exports = (io) => {

    /**
     * send by the API ...
     */
    io.on('client-chat', (msg) => {
        console.log(msg);
    });
}